"use client";

import { useEffect, useState } from "react";
import DayForecast from "./components/DayForecast";

export default function HomePage() {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?" +
      "latitude=51.5074&longitude=-0.1278&" +
      "daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&" +
      "timezone=auto"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weather data");
        return res.json();
      })
      .then((data) => {
        const days = data.daily.time.map((date, index) => ({
          date,
          weathercode: data.daily.weathercode[index],
          tempMax: data.daily.temperature_2m_max[index],
          tempMin: data.daily.temperature_2m_min[index],
          wind: data.daily.windspeed_10m_max[index],
        }));
        setForecast(days.slice(0, 7));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full text-sm font-semibold mb-4 shadow-lg">
            <span className="mr-2">📅</span>
            7-Day Forecast
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Weather Forecast
          </h1>
          
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">London, United Kingdom</span>
          </div>
        </header>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
            <p className="text-gray-600 text-lg">Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
            <div className="text-4xl mb-3">⚠️</div>
            <p className="text-red-600 font-medium">Error: {error}</p>
          </div>
        )}

        {/* Weather Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {forecast.map((day, index) => (
              <div 
                key={day.date} 
                className={`${index === 3 ? 'lg:col-span-1 xl:col-span-1' : ''}`}
              >
                <DayForecast day={day} />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Data provided by <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Open-Meteo API</a></p>
        </footer>
      </div>
    </main>
  );
}

