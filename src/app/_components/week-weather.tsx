import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import WeatherCard from "./weather-card";
import Image from "next/image";
import HighlightCard from "./highlight-card";

interface WeatherDay {
  day: string;
  minTemp: number;
  maxTemp: number;
}

interface WeekWeatherProps {
  data: WeatherDay[];
}

const WeekWeather: React.FC<WeekWeatherProps> = ({ data }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grid-cols-7 gap-3 py-16">
        {data.map((day) => (
          <WeatherCard
            key={day.day}
            day={day.day}
            icon={
              <AspectRatio.Root ratio={1}>
                <Image
                  className="h-full w-full object-cover"
                  alt="Cloudy"
                  src="/icons/cloudy.svg"
                  width={100}
                  height={100}
                />
              </AspectRatio.Root>
            }
            minTemp={day.minTemp.toFixed(0)}
            maxTemp={day.maxTemp.toFixed(0)}
          />
        ))}
      </div>
      <div className="pb-10 text-2xl font-semibold text-black">
        Today&apos;s Highlights
      </div>
      <div className="grid grid-cols-3 gap-6">
        {Array.from({ length: 11 }).map((_, index) => (
          <HighlightCard key={index + index} title="UV Index" content={<div />} />
        ))}
      </div>
    </div>
  );
};

export default WeekWeather;
