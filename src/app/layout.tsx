import "~/styles/globals.css";

import { Analytics } from "@vercel/analytics/next"
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Basic Weather app for day to day weather",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Analytics />
      <body className="h-screen w-screen">
        {children}
      </body>
    </html>
  );
}
