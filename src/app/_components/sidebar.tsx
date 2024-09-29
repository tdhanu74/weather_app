"use client";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  data: {
    temperature2m: string;
    day: string;
    time: string;
    weatherString: string;
    weatherCode: number;
    isDay: boolean;
    icon: string;
  };
  loading: boolean;
}

const iconMap = {
  0: (isDay: boolean) => isDay ? "/icons/clear-day.svg" : "/icons/clear-night.svg",
  1: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day.svg" : "/icons/partly-cloudy-night.svg",
  2: (isDay: boolean) => isDay ? "/icons/overcast-day.svg" : "/icons/overcast-night.svg",
  3: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  45: () => "/icons/fog.svg",
  48: () => "/icons/fog.svg",
  51: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  53: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  55: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  56: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  57: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  61: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  63: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  66: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  67: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  71: () => "/icons/snow.svg",
  73: () => "/icons/snow.svg",
  75: () => "/icons/snow.svg",
  77: () => "/icons/snow.svg",
  80: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  81: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  82: (isDay: boolean) => isDay ? "/icons/partly-cloudy-day-rain.svg" : "/icons/partly-cloudy-night-rain.svg",
  85: () => "/icons/snow.svg",
  86: () => "/icons/snow.svg",
  95: (isDay: boolean) => isDay ? "/icons/thunderstorms-day.svg" : "/icons/thunderstorms-night.svg",
  96: (isDay: boolean) => isDay ? "/icons/thunderstorms-day.svg" : "/icons/thunderstorms-night.svg",
  99: (isDay: boolean) => isDay ? "/icons/thunderstorms-day.svg" : "/icons/thunderstorms-night.svg",

};

const getIcon = (weatherCode: number | undefined, isDay = true) => {
  return iconMap[weatherCode as keyof typeof iconMap]?.(isDay) || "/icons/cloudy.svg";
};


export default function Sidebar({ data, loading }: Readonly<SidebarProps>) {
  // const [searchText, setSearchText] = useState<string>("Search for places...");
  return (
    <div className="flex h-full flex-col py-16 pl-16 sm:w-6/12 md:w-5/12 lg:w-4/12">
      {/* <div className="flex w-full flex-row items-center">
        <Image src="/icons/search.svg" alt="Search" width={24} height={24} />
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          onFocus={() => {
            if (searchText == "Search for places...") setSearchText("");
          }}
          onBlur={() => {
            if (searchText == "") setSearchText("Search for places...");
          }}
          className="bg-transparent px-3 py-2 text-lg outline-none"
        />
        <div className="flex cursor-pointer items-center rounded-full bg-white-glass-2 p-2 shadow transition duration-500 ease-in-out hover:scale-110 active:bg-black-glass-2">
          <Image src="/icons/location.svg" alt="Location" width={24} height={24} />
        </div>
      </div> */}
      <div className={loading ? "self-start w-full" : "self-center"}>
        {
          loading ?
            <div className="rounded-lg shadow w-full h-72 bg-transparent backdrop-blur-md animate-pulse"/>
          :<Image 
            src={getIcon(data?.weatherCode, data?.isDay)} 
            alt="Haze Day" 
            className="w-72" 
            width={24} 
            height={24} 
          />
        }
      </div>
      <div className="flex flex-row items-start py-4 font-roboto leading-none gap-2">
        {
          loading ?
            <div className="rounded-lg shadow h-24 w-48 bg-transparent backdrop-blur-md animate-pulse"/>
          :<>
            <span className="text-[6rem] text-black">{data?.temperature2m}</span>
            <span className="flex flex-col pt-2 text-[3rem] text-white">
              &deg;C
            </span>
          </>
        }
      </div>
      <div className="flex flex-row pb-8 gap-2">
        {
          loading ?
            <div className="rounded-lg shadow h-8 w-36 bg-transparent backdrop-blur-md animate-pulse"/>
          :<>
            <span className="text-2xl text-black">{data?.day},</span>
            <span className="text-2xl text-white">{data?.time}</span>
          </>
        }
      </div>
      <div className="h-[1px] w-full bg-black-glass-2" />
      <div className="flex flex-col pt-8 gap-4">
        {
          loading ?
            <div className="rounded-lg shadow h-8 w-48 bg-transparent backdrop-blur-md animate-pulse"/>
          :<div className="flex flex-row gap-2 items-center">
            <span className="text-2xl text-black">{data?.weatherString}</span>
            <Image src={data?.icon} alt="Wind" width={24} height={24} className="w-12" />
          </div>
        }
      </div>
    </div>
  );
}
