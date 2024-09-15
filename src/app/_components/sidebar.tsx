"use client";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  data: {
    temperature2m: string;
    day: string;
    time: string;
  };
}

export default function Sidebar({ data }: Readonly<SidebarProps>) {
  const [searchText, setSearchText] = useState<string>("Search for places...");
  return (
    <div className="py-18 flex h-full flex-col py-14 py-16 pl-12 pl-14 pl-16 sm:w-6/12 md:w-5/12 lg:w-4/12">
      <div className="flex w-full flex-row items-center">
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
        <div className="flex w-16 cursor-pointer items-center rounded-full bg-white-glass-2 p-2 shadow transition duration-500 ease-in-out hover:scale-110 active:bg-black-glass-2">
          <Image src="/icons/location.svg" alt="Location" width={24} height={24} />
        </div>
      </div>
      <div className="self-center">
        <Image src="/icons/haze-day.svg" alt="Haze Day" className="w-72" width={24} height={24} />
      </div>
      <div className="flex flex-row items-start py-4 font-roboto leading-none gap-2">
        <span className="text-[6rem] text-black">{data?.temperature2m}</span>
        <span className="flex flex-col pt-2 text-[3rem] text-white">
          &deg;C
        </span>
      </div>
      <div className="flex flex-row pb-8 gap-2">
        <span className="text-2xl text-black">{data?.day},</span>
        <span className="text-2xl text-white">{data?.time}</span>
      </div>
      <div className="pt-8"></div>
    </div>
  );
}
