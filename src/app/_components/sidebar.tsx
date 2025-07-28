"use client";
import Image from "next/image";
import type SidebarContent from "../_types/SidebarContent";
import { useCallback, useEffect, useMemo, useState } from "react";

interface SidebarProps {
  data: SidebarContent;
  loading: boolean;
}

const toTitleCase = (str: string) => {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export default function Sidebar({ data, loading }: Readonly<SidebarProps>) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
  }, []);

  const tick = useCallback(() => {
      setDate(new Date());
  }, []);

  const options: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const timeString = useMemo(() => date.toLocaleTimeString("en-GB", options), [date]);
  const dateString = useMemo(() => date.toLocaleDateString(), [date]);
  return (
    <div className="flex h-full flex-col py-16 pl-24 sm:w-6/12 md:w-5/12 lg:w-4/12">
      <div className={loading ? "self-start w-full" : "self-start"}>
        {
          loading ?
            <div className="rounded-lg shadow w-full h-72 bg-white-glass-2 backdrop-blur-md animate-pulse"/>
          :<Image 
            src={data?.icon} 
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
            <div className="rounded-lg shadow h-24 w-48 bg-white-glass-2 backdrop-blur-md animate-pulse"/>
          :<>
            <span className="text-[6rem] text-black">{data?.temperature.toFixed(0)}</span>
            <span className="flex flex-col pt-2 text-[3rem] text-white">
              &deg;{data?.unit === 'celsius' ? "C": "F"}
            </span>
          </>
        }
      </div>
      <div className="flex flex-row pb-8 gap-2">
        {
          loading ?
            <div className="rounded-lg shadow h-8 w-36 bg-white-glass-2 backdrop-blur-md animate-pulse"/>
          :<>
            <span className="text-2xl text-black">{dateString},</span>
            <span className="text-2xl text-white">{timeString}</span>
          </>
        }
      </div>
      {/* <div className="h-[1px] w-full bg-black-glass-2" /> */}
      <div className="flex flex-col pt-8 gap-4">
        {
          loading ?
            <div className="rounded-lg shadow h-10 w-48 bg-white-glass-2 backdrop-blur-md animate-pulse"/>
          :<div className="flex flex-row gap-2 items-center">
            {/* <Image src={data?.icon} alt="Wind" width={24} height={24} className="w-12" /> */}
            <span className="text-2xl text-black">{toTitleCase(data?.description)}</span>
          </div>
        }
        {
          loading ?
            <div className="rounded-lg shadow h-10 w-48 bg-white-glass-2 backdrop-blur-md animate-pulse"/>
          :<div className="flex flex-row gap-2 items-center">
            <Image src="/icons/location.svg" alt="location" width={16} height={16} className="w-8" />
            <span className="text-lg text-black">{data?.city}, {data?.country}</span>
          </div>
        }
      </div>
    </div>
  );
}
