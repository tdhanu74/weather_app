import { type ReactNode } from "react";

interface WeatherCardProps {
  day: string;
  icon: ReactNode;
  minTemp: string;
  maxTemp: string;
  unit: string;
}

export default function WeatherCard({
  day,
  icon,
  minTemp,
  maxTemp,
  unit,
}: Readonly<WeatherCardProps>) {
  return (
    <div className="flex h-full w-full flex-row items-center justify-between overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-3">
      <div className="flex flex-row items-center gap-4">
        <div className="pl-8 text-black text-xl font-bold">{day}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div className="flex flex-col text-lg font-semibold">
          <div className="font-roboto text-black">
            {maxTemp}&deg;{unit == "celsius" ? "C" : "F"}
          </div>
          <div className="font-roboto text-white">
            {minTemp}&deg;{unit == "celsius" ? "C" : "F"}
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
}
