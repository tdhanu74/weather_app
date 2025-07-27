import Image from "next/image";

interface WeatherCardProps {
  day: string,
  icon: string,
  temp_min: number,
  temp_max: number,
  unit: string
}

export default function WeatherCard({
  day,
  icon,
  temp_min,
  temp_max,
  unit
}: Readonly<WeatherCardProps>) {
  return (
    <div className="flex flex-col h-full w-full overflow-hidden rounded-xl bg-transparent shadow backdrop-blur-md p-4">
      <div className="flex justify-center items-center text-[1.5rem]">
        {day}
      </div>
      <Image 
        src={icon} 
        alt="Haze Day"
        className="w-full self-center"
        width={24} 
        height={24} 
      />
      <div className="flex flex-row justify-center text-lg">
        <div className="flex flex-row gap-4">
          <div className="font-roboto text-black text-[1.5rem]">
            {temp_max.toFixed(0)}&deg;{unit == "celsius" ? "C" : "F"}
          </div>
          <div className="font-roboto text-white text-[1.5rem]">
            {temp_min.toFixed(0)}&deg;{unit == "celsius" ? "C" : "F"}
          </div>
        </div>
      </div>
    </div>
  );
}
