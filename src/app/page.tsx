import { HydrateClient } from "~/trpc/server";
import WeatherApp from "./_components/weather-app";


export default async function Home() {

  return (
    <HydrateClient>
      <main className="flex h-screen w-full items-center justify-between px-16 py-14 shadow-lg">
        <div className="flex flex-row sm:rounded-[1rem] md:rounded-[2rem] lg:rounded-[2rem] w-full h-full overflow-y-auto bg-white-glass-2 backdrop-blur-xl shadow-lg">
          <WeatherApp />
        </div>
      </main>
    </HydrateClient>
  );
}
