"use client";
import Sidebar from "./sidebar";
import * as Tabs from "@radix-ui/react-tabs";
import WeekWeather from "./week-weather";
import TodayWeather from "./today-weather";
import React, { useEffect, useState } from "react";
import { fetchWeatherApi } from "openmeteo";

const stringMap = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  66: "Heavy rain",
  67: "Heavy rain",
  71: "Slight snow",
  73: "Moderate snow",
  75: "Heavy snow",
  77: "Dense snow",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Heavy rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};


const iconMap = {
  0: (isDay: boolean) => isDay ? "/icons/clear-day.svg" : "/icons/clear-night.svg",
  1: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day.svg" : "/icons/partly-cloudy-night.svg",
  2: () => "/icons/cloudy.svg",
  3: () => "/icons/rain.svg",
  45: () => "/icons/fog.svg",
  48: () => "/icons/fog.svg",
  51: () => "/icons/drizzle.svg",
  53: () => "/icons/drizzle.svg",
  55: () => "/icons/rain.svg",
  56: () => "/icons/rain.svg",
  57: () => "/icons/rain.svg",
  61: () => "/icons/drizzle.svg",
  63: () => "/icons/rain.svg",
  66: () => "/icons/rain.svg",
  67: () => "/icons/rain.svg",
  71: () => "/icons/snow.svg",
  73: () => "/icons/snow.svg",
  75: () => "/icons/snow.svg",
  77: () => "/icons/snow.svg",
  80: () => "/icons/drizzle.svg",
  81: () => "/icons/rain.svg",
  82: () => "/icons/rain.svg",
  85: () => "/icons/snow.svg",
  86: () => "/icons/snow.svg",
  95: () => "/icons/thunderstorms.svg",
  96: () => "/icons/thunderstorms.svg",
  99: () => "/icons/thunderstorms.svg",
};

const getIcon = (weatherCode: number | undefined, isDay = true) => {
  return iconMap[weatherCode as keyof typeof iconMap]?.(isDay) || "/icons/default.svg";
};

const getString = (weatherCode: number | undefined) => {
  return stringMap[weatherCode as keyof typeof stringMap] || "Unknown weather";
};

// Add this type definition
type ICurrentWeather = {
  day: string;
  time: string;
  icon: string;
  weatherString: string;
  weatherCode: number;
  isDay: boolean;
  temperature2m: string;
  precipitation: number;
  rain: number | undefined;
  showers: number | undefined;
  snowfall: number | undefined;
  windSpeed10m: number | undefined;
  windDirection10m: number | undefined;
};

type ITodayWeather = {
  windSpeed: number | undefined;
  windDirection: number | undefined;
  rain: number | undefined;
  showers: number | undefined;
  snowfall: number | undefined;
  uvIndex: number | undefined;
  humidity: number | undefined;
  sunrise: number | undefined;
  sunset: number | undefined;
  precipitation: number | undefined;
  precipitationProbability: number | undefined;
};

// Add this type definition at the top of the file, near the CurrentWeather type
type IWeekWeather = {
  day: string;
  icon: string;
  minTemp: number;
  maxTemp: number;
};

type IHourlyWeather = {
  time: string;
  temperature2m: number;
};

const range = (start: number, stop: number, step: number) =>

  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

const fetchWeatherData = (
  location: { latitude: number; longitude: number },
  unit: string,
  setWeekWeather: React.Dispatch<React.SetStateAction<IWeekWeather[] | null>>,
  setCurrentWeather: React.Dispatch<
    React.SetStateAction<ICurrentWeather | null>
  >,
  setTodayWeather: React.Dispatch<React.SetStateAction<ITodayWeather | null>>,
  setHourlyWeather: React.Dispatch<React.SetStateAction<IHourlyWeather[] | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
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
          icon: getWeatherIcon(current?.variables(1)?.value(), current?.variables(6)?.value()),
          weatherString: getString(current?.variables(6)?.value() ?? 0),
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
          temperature2m: hourly?.variables(0)?.valuesArray() ?? [],
          relativeHumidity2m: hourly?.variables(1)?.valuesArray() ?? [],
          precipitationProbability: hourly?.variables(2)?.valuesArray() ?? [],
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
          sunset: daily?.variables(4)?.valuesArray() ?? [],
          uvIndexMax: daily?.variables(5)?.valuesArray() ?? [],
        },
      };

      console.log(weatherData)

      const getDayName = (index: number, date: Date) => {
        if (index === 0) return "Today";
        if (index === 1) return "Tomorrow";
        return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
      };

      const weekWeather = weatherData.daily.time.map((date, i) => ({
        day: getDayName(i, date),
        icon: getIcon(weatherData.daily.weatherCode[i]),
        minTemp: weatherData.daily.temperature2mMin[i],
        maxTemp: weatherData.daily.temperature2mMax[i],
        sunrise: weatherData.daily?.sunrise?.[i] ?? null,
        sunset: weatherData.daily?.sunset?.[i] ?? null,
        uvIndexMax: weatherData.daily?.uvIndexMax?.[i] ?? null,
      }));


      const todayWeather = {
        windSpeed: weatherData.current.windSpeed10m,
        windDirection: weatherData.current.windDirection10m,
        rain: weatherData.current.rain,
        showers: weatherData.current.showers,
        snowfall: weatherData.current.snowfall,
        sunrise: weatherData.daily.sunrise[0] ?? 0,
        sunset: weatherData.daily.sunset[0] ?? 0,
        uvIndex: weatherData.daily.uvIndexMax[0] ?? 0,
      }


      const currentTime = new Date();
      const hourlyWeather = weatherData.hourly.time
        .map((date, i) => ({
          time: date.toLocaleTimeString("en-US", {
            hour: "numeric",
          }),
          temperature2m: weatherData.hourly.temperature2m[i] ?? 0,
        }))
        .filter((item, index) => {
          const itemDate = weatherData.hourly.time[index];
          if (itemDate) {
            return itemDate >= currentTime && itemDate < new Date(currentTime.getTime() + 24 * 60 * 60 * 1000 * 2);
          }
          return false;
        });
      setWeekWeather(weekWeather as IWeekWeather[]);
      setCurrentWeather(weatherData.current as ICurrentWeather);
      setHourlyWeather(hourlyWeather as IHourlyWeather[]);
      setTodayWeather(todayWeather as ITodayWeather);
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setIsLoading(false)
    }
  };

  fetchWeatherData().catch((error) => {
    console.error("Error in fetchWeatherData:", error);
    setIsLoading(false)
  });
};

const getWeatherIcon = (isDay: number | undefined, weatherCode: number | undefined) => {
  if (isDay === undefined) return getIcon(weatherCode ?? 0);
  return getIcon(weatherCode ?? 0, isDay === 1);
};

const WeatherApp = () => {
  const [unit, setUnit] = useState<string>("celsius");
  const [weekWeather, setWeekWeather] = useState<IWeekWeather[] | null>(null);
  const [currentWeather, setCurrentWeather] = useState<ICurrentWeather | null>(
    null,
  );
  const [todayWeather, setTodayWeather] = useState<ITodayWeather | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<IHourlyWeather[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: { latitude: number; longitude: number } = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          fetchWeatherData(location, unit, setWeekWeather, setCurrentWeather, setTodayWeather, setHourlyWeather, setIsLoading);
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
          fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then((data: { ip: string }) => {
              console.log('Your Public IP Address:', data.ip);
              fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=444faae1a0c0442bb77a853241e3b4ca&ip=${data.ip}`)
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
                    setTodayWeather,
                    setHourlyWeather,
                    setIsLoading
                  );
                } else {
                  setIsLoading(false)
                  console.error("Invalid data from IP API");
                }
              })
              .catch((error) => {
                console.error("Error fetching location data:", error);
                setIsLoading(false)
              });
            })
            .catch(error => {
              console.error('Error fetching IP:', error);
            });
        },
      );
    }
  }, [unit]);

  return (
    <>
      <Sidebar data = {currentWeather!} loading= {isLoading}/>
      <div className = "h-full w-full overflow-y-auto py-16 sm:px-12 md:px-14 lg:px-16" >
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
            <Tabs.Content className="overflow-y-auto" value="today">
              {todayWeather && hourlyWeather && <TodayWeather todayWeather={todayWeather} hourlyWeather={hourlyWeather} unit={unit} loading={isLoading} />}
            </Tabs.Content>
            <Tabs.Content className="overflow-y-auto" value="week">

              {weekWeather && <WeekWeather weekWeather={weekWeather} unit={unit} loading={isLoading} />}
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div >
    </>
  );
};

export default WeatherApp;
