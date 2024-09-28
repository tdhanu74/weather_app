import HighlightCard from "./highlight-card";

interface TodayWeather {
  windSpeed: number | undefined;
  windDirection: number | undefined;
  rain: number | undefined;
  showers: number | undefined;
  snowfall: number | undefined;
  uvIndex: number | undefined;
  humidity: number | undefined;
  sunrise: number | undefined;
  sunset: number | undefined;
  precipitation: number | undefined;
  precipitationProbability: number | undefined;
}

interface HourlyWeather {
  time: string;
  temperature2m: number;
}

const TodayWeather = ({
  todayWeather,
  hourlyWeather,
  unit,
}: {
  todayWeather: TodayWeather;
  hourlyWeather: HourlyWeather[];
  unit: string;
}) => {
  return (
    <div className="flex flex-col gap-4 py-16">
      <div className="flex flex-row overflow-x-auto rounded-xl bg-transparent p-4 shadow backdrop-blur-sm">
        {hourlyWeather.map((hour, index) => (
          <div
            key={hour.time + index}
            className="flex flex-col items-center gap-2 px-1"
          >
            <div className="pb-6 font-roboto text-xs font-bold">
              {hour.temperature2m.toFixed(0)}&deg;
              {unit == "celsius" ? "C" : "F"}
            </div>
            <div className="flex h-32 w-full items-end justify-center">
              <div
                className="h-full w-6 rounded-full bg-white-glass shadow"
                style={{
                  maxHeight: `${(hour.temperature2m / Math.max(...hourlyWeather.map((h) => h.temperature2m))) * 100}%`,
                }}
              />
            </div>
            <div className={"whitespace-nowrap text-xs"}>
              {index ? hour.time : "Now"}
            </div>
          </div>
        ))}
      </div>
      <div className="py-6 text-2xl font-semibold text-black">
        Today&apos;s Highlights
      </div>
      <div className="grid grid-cols-2 gap-6">
        <HighlightCard
          key="sunrise-sunset"
          title="Sunrise and Sunset"
          content={
            <div>
              <div>
                <div>Sunrise</div>
                <div>{todayWeather.sunrise}</div>
              </div>
              <div>
                <div>Sunset</div>
                <div>{todayWeather.sunset}</div>
              </div>
            </div>

          }
        />
        <HighlightCard
          key="sunrise-sunset"
          title="Sunrise and Sunset"
          content={<div />}
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <HighlightCard
          key="sunrise-sunset"
          title="Sunrise and Sunset"
          content={<div />}
        />
        <HighlightCard
          key="sunrise-sunset"
          title="Sunrise and Sunset"
          content={<div />}
        />
        <HighlightCard
          key="sunrise-sunset"
          title="Sunrise and Sunset"
          content={<div />}
        />
      </div>
    </div>
  );
};

export default TodayWeather;
