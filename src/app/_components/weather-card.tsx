import { ReactNode } from "react"

interface WeatherCardProps {
    day: string
    icon: ReactNode
    minTemp: string
    maxTemp: string
}

export default function WeatherCard({ day, icon, minTemp, maxTemp }: Readonly<WeatherCardProps>) {
    return (
        <div className="bg-transparent flex flex-col justify-between items-center w-full h-full rounded-xl sm:p-3 md:p-5 lg:p-6 shadow backdrop-blur-md">
            <div className="text-white sm:text-sm md:text-md lg:text-lg">
                {day}
            </div>
            {icon}
            <div className="flex flex-row gap-2">
                <div className="text-black font-roboto">
                    {maxTemp}&deg;
                </div>
                <div className="text-white font-roboto">
                    {minTemp}&deg;
                </div>
            </div>
        </div>
    )
}