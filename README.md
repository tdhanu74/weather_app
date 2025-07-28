# 🌤️ Weather App

A weather forecast application built using **Next.js** and **OpenWeatherMap API**, allowing users to search for current weather conditions in any city with a clean, responsive UI.

---

## 🔍 Overview

* **Platform**: NextJs
* **API**: Integrates with a weather data provider (e.g. OpenWeatherMap)
* **Core Features**:

  * **Current weather** by location
  * 5‑day forecast with hourly/daily breakdowns
  * **Temperature, humidity, wind speed**, and more
  * **Location awareness**: Use GPS for automatic city detection

---

## 🔧 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: Typescript
- **Styling**: Tailwind CSS
- **API**: [OpenWeatherMap](https://openweathermap.org/api)

---

## 🚀 Getting Started (Local Setup)

### 1. **Clone the Repository**

```bash
git clone https://github.com/tdhanu74/weather_app.git
cd weather_app
```

### 2. **Install Dependencies**

```bash
npm install
```

### 3. Set Up Environment Variables

Create a .env.local file in the root directory and add your OpenWeatherMap API key:

```NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key```

You can get a free API key from https://openweathermap.org/api

### 4. Run the Development Server

```bash
npm run dev
```

Open your browser and visit:
👉 http://localhost:3000