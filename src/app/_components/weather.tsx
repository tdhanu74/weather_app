import Image from "next/image";
import type Content from "../_types/Content";
import WeatherCard from "./weather-card";

interface WeatherProps {
  data: Content,
  loading: boolean
}

const TodayWeather = ({
  data,
  loading
}: Readonly<WeatherProps>) => {
  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex flex-row gap-4 h-full">
        <div className="flex flex-col h-full w-2/5 gap-4">
          <div className="flex flex-row justify-between h-full w-full overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
            <div className="flex flex-col h-full text-[1.5rem]">
              <h1>Humidity</h1>
              <h2 className="text-white">{data?.weather.humidity}%</h2>
            </div>
            <Image
              src={"/icons/humidity.svg"}
              alt="Humidity"
              className="h-full w-24 self-center"
              width={24}
              height={24}
            />
          </div>
          <div className="flex flex-row justify-between h-full w-full overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
            <div className="flex flex-col h-full text-[1.5rem]">
              <h1>Pressure</h1>
              <h2 className="text-white">{data?.weather.pressure} hPa</h2>
            </div>
            <Image
              src={data?.weather.pressure < 1014 ? "/icons/pressure-low.svg" : "/icons/pressure-high.svg"}
              alt="Pressure"
              className="h-full w-24 self-center"
              width={24}
              height={24}
            />
          </div>
        </div>
        <div className="flex flex-col h-full w-1/5 overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
          <div className="flex justify-center items-center text-[1.5rem]">
            Wind
          </div>
          <Image
            src={"/icons/wind.svg"}
            alt="Wind"
            className="w-full self-center"
            width={24}
            height={24}
          />
          <div className="flex flex-row justify-center text-lg">
            {data?.weather.wind.speed} {data?.unit === "celsius" ? "m/s": "mph"}
          </div>
        </div>
        <div className="flex flex-col h-full w-1/5 overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
          <div className="flex justify-center items-center text-[1.5rem]">
            Sunrise
          </div>
          <Image
            src={"/icons/sunrise.svg"}
            alt="Sunrise"
            className="w-full self-center"
            width={24}
            height={24}
          />
          <div className="flex flex-row justify-center text-lg">
            {new Date(data?.weather.sunrise ?? 0).toLocaleTimeString()}
          </div>
        </div>
        <div className="flex flex-col h-full w-1/5 overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
          <div className="flex justify-center items-center text-[1.5rem]">
            Sunset
          </div>
          <Image
            src={"/icons/sunset.svg"}
            alt="Sunset"
            className="w-full self-center"
            width={24}
            height={24}
          />
          <div className="flex flex-row justify-center text-lg">
            {new Date(data?.weather.sunset ?? 0).toLocaleTimeString()}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-4 h-full">
        {
          loading ?
            Array.from([1, 2, 3, 4, 5, 6]).map(temp => <div key={temp} className="h-[14.5rem] w-full rounded-xl bg-transparent shadow backdrop-blur-sm animate-pulse" />)
            : data?.weekdays?.map((day, index: number) => <WeatherCard
              key={day.day}
              day={index === 0 ? "Today" : index === 1 ? "Tomorrow" : day.day}
              icon={day.icon}
              temp_min={day.temp_min}
              temp_max={day.temp_max}
              unit={data.unit}
            />)
        }
      </div>
    </div>
  );
};

export default TodayWeather;
