import WeatherCard from "./weather-card";
import Image from "next/image";

interface WeatherDay {
  day: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

interface WeekWeatherProps {
  weekWeather: WeatherDay[];
  unit: string;
}

const WeekWeather: React.FC<WeekWeatherProps> = ({ weekWeather, unit }) => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid grid-rows-7 gap-3 py-16">
        {weekWeather.map((day) => (
          <WeatherCard
            key={day.day}
            day={day.day}
            icon={
              <Image
                className="h-10 w-10"
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
