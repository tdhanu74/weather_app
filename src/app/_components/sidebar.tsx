"use client";
import Image from "next/image";
import type SidebarContent from "../_types/SidebarContent";

interface SidebarProps {
  data: SidebarContent;
  loading: boolean;
}

export default function Sidebar({ data, loading }: Readonly<SidebarProps>) {
  return (
    <div className="flex h-full flex-col py-16 pl-24 sm:w-6/12 md:w-5/12 lg:w-4/12">
      <div className={loading ? "self-start w-full" : "self-start"}>
        {
          loading ?
            <div className="rounded-lg shadow w-full h-72 bg-transparent backdrop-blur-md animate-pulse"/>
          :<Image 
            src={data.icon} 
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
            <div className="rounded-lg shadow h-8 w-36 bg-transparent backdrop-blur-md animate-pulse"/>
          :<>
            <span className="text-2xl text-black">{new Date().toLocaleDateString()},</span>
            <span className="text-2xl text-white">{new Date().toLocaleTimeString()}</span>
          </>
        }
      </div>
      {/* <div className="h-[1px] w-full bg-black-glass-2" /> */}
      <div className="flex flex-col pt-8 gap-4">
        {
          loading ?
            <div className="rounded-lg shadow h-10 w-48 bg-transparent backdrop-blur-md animate-pulse"/>
          :<div className="flex flex-row gap-2 items-center">
            {/* <Image src={data?.icon} alt="Wind" width={24} height={24} className="w-12" /> */}
            <span className="text-2xl text-black">{data?.description}</span>
          </div>
        }
        {
          loading ?
            <div className="rounded-lg shadow h-10 w-48 bg-transparent backdrop-blur-md animate-pulse"/>
          :<div className="flex flex-row gap-2 items-center">
            <Image src="/icons/location.svg" alt="location" width={16} height={16} className="w-8" />
            <span className="text-lg text-black">{data?.city}, {data?.country}</span>
          </div>
        }
      </div>
    </div>
  );
}
