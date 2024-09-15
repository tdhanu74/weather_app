import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import WeatherCard from "./weather-card";
import Image from "next/image";
import HighlightCard from "./highlight-card";

interface WeekWeatherProps {
  data: any; // Replace 'any' with a more specific type if possible
}

const WeekWeather: React.FC<WeekWeatherProps> = ({ data }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grid-cols-7 gap-3 py-16">
        {data.map((day: any) => {
          return (
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
              minTemp={Number(day.minTemp).toFixed(0)}
              maxTemp={Number(day.maxTemp).toFixed(0)}
            />
          );
        })}
      </div>
      <div className="pb-10 text-2xl font-semibold text-black">
        Today's Highlights
      </div>
      <div className="grid grid-cols-3 gap-6">
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
        <HighlightCard title="UV Index" content={<div></div>} />
      </div>
    </div>
  );
};

export default WeekWeather;
