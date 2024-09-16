"use client";
import Sidebar from "./sidebar";
import * as Tabs from "@radix-ui/react-tabs";
import WeekWeather from "./week-weather";
import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

// Add this type definition
type CurrentWeather = {
  day: string;
  time: string;
  temperature2m: string;
  isDay: boolean;
  precipitation: number;
  rain: number | undefined;
  showers: number | undefined;
  snowfall: number | undefined;
  weatherCode: number | undefined;
  windSpeed10m: number | undefined;
  windDirection10m: number | undefined;
};

// Add this type definition at the top of the file, near the CurrentWeather type
type WeekWeather = {
  day: string;
  icon: number;
  minTemp: number;
  maxTemp: number;
};

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const fetchWeatherData = (
  location: { latitude: number; longitude: number },
  unit: string,
  setWeekWeather: React.Dispatch<React.SetStateAction<WeekWeather[] | null>>,
  setCurrentWeather: React.Dispatch<
    React.SetStateAction<CurrentWeather | null>
  >,
) => {
  const params = {
    latitude: location.latitude,
    longitude: location.longitude,
    current: [
      "temperature_2m",
      "is_day",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "wind_speed_10m",
      "wind_direction_10m",
    ],
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation_probability",
      "precipitation",
      "rain",
      "showers",
      "snowfall",
      "weather_code",
      "wind_speed_10m",
      "uv_index",
    ],
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "uv_index_max",
    ],
    temperature_unit: unit,
    wind_speed_unit: "ms",
    timezone: "auto",
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  const fetchWeatherData = async () => {
    try {
      const data = await fetchWeatherApi(url, params);
      const response = data[0];

      // Attributes for timezone and location
      const utcOffsetSeconds = response?.utcOffsetSeconds();

      const current = response?.current();
      const hourly = response?.hourly();
      const daily = response?.daily();

      // Note: The order of weather variables in the URL query and the indices below need to match!
      const weatherData = {
        current: {
          day: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ][
            new Date(
              (Number(current?.time()) + (utcOffsetSeconds ?? 0)) * 1000,
            ).getDay()
          ],
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }),
          temperature2m: current?.variables(0)?.value()?.toFixed(0) ?? "",
          isDay: current?.variables(1)?.value() ?? false,
          precipitation: current?.variables(2)?.value() ?? 0,
          rain: current?.variables(3)?.value(),
          showers: current?.variables(4)?.value(),
          snowfall: current?.variables(5)?.value(),
          weatherCode: current?.variables(6)?.value(),
          windSpeed10m: current?.variables(7)?.value(),
          windDirection10m: current?.variables(8)?.value(),
        },
        hourly: {
          time: range(
            Number(hourly?.time()),
            Number(hourly?.timeEnd()),
            hourly?.interval() ?? 0,
          ).map((t) => new Date((t + (utcOffsetSeconds ?? 0)) * 1000)),
          temperature2m: hourly?.variables(0)?.valuesArray(),
          relativeHumidity2m: hourly?.variables(1)?.valuesArray(),
          precipitationProbability: hourly?.variables(2)?.valuesArray(),
          precipitation: hourly?.variables(3)?.valuesArray(),
          rain: hourly?.variables(4)?.valuesArray(),
          showers: hourly?.variables(5)?.valuesArray(),
          snowfall: hourly?.variables(6)?.valuesArray(),
          weatherCode: hourly?.variables(7)?.valuesArray(),
          windSpeed10m: hourly?.variables(8)?.valuesArray(),
          uvIndex: hourly?.variables(9)?.valuesArray(),
        },
        daily: {
          time: range(
            Number(daily?.time()),
            Number(daily?.timeEnd()),
            daily?.interval() ?? 0,
          ).map((t) => new Date((t + (utcOffsetSeconds ?? 0)) * 1000)),
          weatherCode: daily?.variables(0)?.valuesArray() ?? [],
          temperature2mMax: daily?.variables(1)?.valuesArray() ?? [],
          temperature2mMin: daily?.variables(2)?.valuesArray() ?? [],
          sunrise: daily?.variables(3)?.valuesArray() ?? [],
          sunset: daily?.variables(4)?.valuesArray(),
          uvIndexMax: daily?.variables(5)?.valuesArray(),
        },
      };

      const weekWeather = weatherData.daily.time.map((date, i) => ({
        day: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ][date.getDay()],
        icon: weatherData.daily.weatherCode[i],
        minTemp: weatherData.daily.temperature2mMin[i],
        maxTemp: weatherData.daily.temperature2mMax[i],
      }));

      setWeekWeather(weekWeather as WeekWeather[]);
      setCurrentWeather(weatherData.current as CurrentWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  fetchWeatherData().catch((error) => {
    console.error("Error in fetchWeatherData:", error);
  });
};

const WeatherApp = () => {
  const [unit, setUnit] = useState<string>("celsius");
  const [weekWeather, setWeekWeather] = useState<WeekWeather[] | null>(null);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null,
  );
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: { latitude: number; longitude: number } = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherData(location, unit, setWeekWeather, setCurrentWeather);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error("Geolocation error: Permission denied");
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Geolocation error: Position unavailable");
              break;
            case error.TIMEOUT:
              console.error("Geolocation error: Request timed out");
              break;
            default:
              console.error("Geolocation error:", error.message);
          }
          fetch("https://ipapi.co/json")
            .then((res) => res.json())
            .then((data: { latitude: number; longitude: number }) => {
              if (
                data &&
                typeof data.latitude === "number" &&
                typeof data.longitude === "number"
              ) {
                fetchWeatherData(
                  { latitude: data.latitude, longitude: data.longitude },
                  unit,
                  setWeekWeather,
                  setCurrentWeather,
                );
              } else {
                console.error("Invalid data from IP API");
              }
            })
            .catch((error) => {
              console.error("Error fetching location data:", error);
            });
        },
      );
    }
  }, [unit]);

  return (
    <>
      <Sidebar data={currentWeather!} />
      <div className="py-18 h-full w-full overflow-y-auto py-14 py-16 sm:px-12 md:px-14 lg:px-16">
        <div className="flex flex-col">
          <Tabs.Root defaultValue="today">
            <div className="flex flex-row justify-between">
              <Tabs.List className="flex flex-row font-semibold text-black sm:gap-4 sm:text-xl md:gap-6 md:text-2xl">
                <Tabs.Trigger
                  className="underline-offset-8 transition duration-500 ease-out data-[state=active]:scale-110 data-[state=active]:cursor-default data-[state=inactive]:opacity-60 data-[state=inactive]:hover:scale-110 data-[state=inactive]:hover:opacity-80"
                  value="today"
                >
                  <div>Today</div>
                </Tabs.Trigger>
                <Tabs.Trigger
                  className="underline-offset-8 transition duration-500 ease-out data-[state=active]:scale-110 data-[state=active]:cursor-default data-[state=inactive]:opacity-60 data-[state=inactive]:hover:scale-110 data-[state=inactive]:hover:opacity-80"
                  value="week"
                >
                  <div>Week</div>
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Root defaultValue="C">
                <Tabs.List className="flex flex-row font-roboto sm:gap-4 md:gap-6">
                  <Tabs.Trigger
                    className="flex h-12 w-12 items-center rounded-full pl-[0.625rem] pt-[0.125rem] shadow transition duration-500 ease-in-out data-[state=active]:scale-110 data-[state=active]:cursor-default data-[state=active]:bg-black-glass-2 data-[state=inactive]:bg-white-glass-2 data-[state=active]:text-white data-[state=inactive]:text-black-glass data-[state=inactive]:hover:scale-110"
                    value="C"
                    onClick={() => setUnit("celsius")}
                  >
                    <div className="font-semibold sm:text-xl md:text-2xl">
                      &deg;C
                    </div>
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="flex h-12 w-12 items-center rounded-full pl-[0.75rem] pt-[0.125rem] shadow transition duration-500 ease-in-out data-[state=active]:scale-110 data-[state=active]:cursor-default data-[state=active]:bg-black-glass-2 data-[state=inactive]:bg-white-glass-2 data-[state=active]:text-white data-[state=inactive]:text-black-glass data-[state=inactive]:hover:scale-110"
                    value="F"
                    onClick={() => setUnit("fahrenheit")}
                  >
                    <div className="font-semibold sm:text-xl md:text-2xl">
                      &deg;F
                    </div>
                  </Tabs.Trigger>
                </Tabs.List>
              </Tabs.Root>
            </div>
            <Tabs.Content className="" value="today">
              <div></div>
            </Tabs.Content>
            <Tabs.Content className="" value="week">
              {weekWeather && <WeekWeather data={weekWeather} />}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
