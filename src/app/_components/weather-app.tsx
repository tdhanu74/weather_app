"use client";
import Sidebar from "./sidebar";
import * as Tabs from "@radix-ui/react-tabs";
// import Weather from "./weather";
import React, { useEffect, useState } from "react";
import type SidebarContent from "../_types/SidebarContent";
// import Content from "../_types/Content";

type WeatherContent = {
  weather: {
    main: string,
    description: string,
    icon: string
  }[],
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number,
    gust: number
  },
  sys: {
    country: string,
    sunrise: string,
    sunset: string
  },
  name: string
}

type ForecastContent = {
  list: {
    main: {
      temp: number,
      feels_like: number,
      temp_min: number,
      temp_max: number
    },
    weather: {
      main: string,
      description: string,
      icon: string
    }[],
    dt_txt: string
  }[]
}

type CountryContent = {
  name: {
    common: string
  }
}

const fetchWeatherData = async (
  location: { latitude: number; longitude: number },
  unit: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSidebarContent: React.Dispatch<React.SetStateAction<SidebarContent | null>>,
) => {

  const getDayName = (date: Date): string => {
    return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()] ?? "";
  };

  try {

    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=2d69f484dc9a594267d35f54b254393d&units=${unit === "celsius"? "metric": "imperial"}`).then((res) =>
      res.json(),
    ) as WeatherContent

    const forecast: ForecastContent = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&appid=2d69f484dc9a594267d35f54b254393d&units=${unit === "celsius"? "metric": "imperial"}`).then((res) =>
      res.json(),
    ) as ForecastContent

    const country = await fetch(`https://restcountries.com/v3.1/alpha/${weather.sys.country}`).then((res) =>
      res.json(),
    ) as CountryContent[];

    const sideBarContent: SidebarContent = {
      temperature: weather.main.temp,
      feels_like: weather.main.feels_like,
      description: weather.weather[0]?.description ?? "",
      icon: weather.weather[0]?.icon ?? "",
      city: weather.name,
      country: country[0]?.name.common ?? "",
      unit: unit
    }

    setSidebarContent(sideBarContent)

    const weekdata: Record<string, {
      weather: string,
      temp: number,
      temp_min: number,
      temp_max: number
    }> = {}
    const today = (new Date()).toISOString().split("T")[0]
    for (const data of forecast.list) {
      const day: string = getDayName(new Date(data.dt_txt.split(" ")[0] ?? ""))
      if (day !== today) {
        weekdata[day] = {
          weather: data.weather[0]?.main ?? "",
          temp: (weekdata[day]?.temp ?? 0 + data.main.temp)/2,
          temp_min: Math.min(weekdata[day]?.temp_min ?? 0, data.main.temp_min),
          temp_max: Math.max(weekdata[day]?.temp_max ?? 0, data.main.temp_max)
        }
      }
    }

    setIsLoading(false)
  } catch (error) {
    console.error("Error fetching weather data:", error);
    setIsLoading(false)
  }
};

const WeatherApp = () => {
  const [unit, setUnit] = useState<string>("celsius");
  const [sidebarContent, setSidebarContent] = useState<SidebarContent | null>(
    null,
  );
  // const [content, setContent] = useState<Content | null>(
  //   null,
  // );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [, setLocation] = useState<string>("");

  const getLocationForWeatherApi = async () => {
    const location: { longitude?: number, latitude?: number } = {}
    await fetch(`https://ipapi.co/json/`)
      .then((res) => { return res.json() })
      .then((data: { latitude: number; longitude: number; city: string; region: string; country_name: string; }) => {
        if (
          data &&
          typeof data.latitude === "number" &&
          typeof data.longitude === "number"
        ) {
          setLocation(data.city + ", " + data.region + ", " + data.country_name)
          location.latitude = data.latitude
          location.longitude = data.longitude
        } else {
          setIsLoading(false)
          console.error("Invalid data from IP API");
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
        setIsLoading(false)
      });
    return location
  }

  useEffect(() => {
    const getWeatherData = async () => {
      let locationError = false
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: { latitude: number; longitude: number } = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            fetchWeatherData(location, unit, setIsLoading, setSidebarContent).catch((e:Error) => { console.error(e)});
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
            locationError = true
          },
        );
      } else {
        const location = await getLocationForWeatherApi();
        if (location.latitude && location.longitude) {
          fetchWeatherData(
            location as { latitude: number, longitude: number },
            unit,
            setIsLoading,
            setSidebarContent
          ).catch((e:Error) => { console.error(e)});
        } else {
          console.error("Error while fetching location to get the weather")
        }
      }
      if (locationError) {
        const location = await getLocationForWeatherApi().catch((e:Error) => { console.error(e)});
        if (location?.latitude && location?.longitude) {
          fetchWeatherData(
            location as { latitude: number, longitude: number },
            unit,
            setIsLoading,
            setSidebarContent
          ).catch((e:Error) => { console.error(e)});
        } else {
          console.error("Error while fetching location to get the weather")
        }
      }
    }
    setIsLoading(true)
    getWeatherData().catch((e:Error) => { console.error(e)})
  }, [unit]);

  return (
    <>
      <Sidebar data={sidebarContent!} loading={isLoading} />
      <div className="h-full w-full overflow-y-auto py-16 sm:px-12 md:px-14 lg:px-16" >
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
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
          {/* <Weather todayWeather={todayWeather} hourlyWeather={hourlyWeather} unit={unit} loading={isLoading} /> */}
        </div>
      </div >
    </>
  );
};

export default WeatherApp;
