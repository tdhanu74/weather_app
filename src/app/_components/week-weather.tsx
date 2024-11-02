import WeatherCard from "./weather-card";
import Image from "next/image";

interface WeatherDay {
  day: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

interface WeekWeatherProps {
  weekWeather: WeatherDay[] | null;
  unit: string;
  loading: boolean;
}

const WeekWeather: React.FC<WeekWeatherProps> = ({ weekWeather, unit, loading }) => {
  return (
    <div className="flex h-full w-full flex-col overflow-y-auto">
      <div className="grid grid-rows-7 gap-3 py-16 overflow-y-auto">
        {loading ?
          Array.from([0, 0, 0, 0, 0, 0, 0]).map((_, index) => <div className="p-3 w-full overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md animate-pulse" key={_ + index}>
            <div className="h-24 w-full"/>
          </div>)
          : weekWeather?.map((day) => (
            <WeatherCard
              key={day.day}
              day={day.day}
              icon={
                <Image
                  className="h-24 w-24 pb-3"
                  alt="Cloudy"
                  src={`${day.icon}`}
                  width={100}
                  height={100}
                />
              }
              minTemp={day.minTemp.toFixed(0)}
              maxTemp={day.maxTemp.toFixed(0)}
              unit={unit}
            />
          ))}
      </div>
    </div>
  );
};

export default WeekWeather;
