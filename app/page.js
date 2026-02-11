"use client";

import { useEffect, useState } from "react";
import DayForecast from "@/components/DayForecast";

export default function HomePage() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?" +
      "latitude=51.5074&longitude=-0.1278&" +
      "daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&" +
      "timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        const days = data.daily.time.map((date, index) => ({
          date,
          weathercode: data.daily.weathercode[index],
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
          wind: data.daily.windspeed_10m_max[index],
        }));
        setForecast(days.slice(0, 7));
      });
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        7-Day Weather Forecast (London)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {forecast.map((day) => (
          <DayForecast key={day.date} day={day} />
        ))}
      </div>
    </main>
  );
}
