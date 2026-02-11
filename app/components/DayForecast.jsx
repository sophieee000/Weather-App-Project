"use client";

const weatherMap = {
  0: { text: "Clear sky", icon: "☀️" },
  1: { text: "Mainly clear", icon: "🌤️" },
  2: { text: "Partly cloudy", icon: "⛅" },
  3: { text: "Overcast", icon: "☁️" },
  45: { text: "Fog", icon: "🌫️" },
  48: { text: "Fog", icon: "🌫️" },
  51: { text: "Light drizzle", icon: "🌦️" },
  53: { text: "Drizzle", icon: "🌦️" },
  55: { text: "Dense drizzle", icon: "🌧️" },
  61: { text: "Rain", icon: "🌧️" },
  63: { text: "Rain", icon: "🌧️" },
  65: { text: "Heavy rain", icon: "🌧️" },
  71: { text: "Snow", icon: "❄️" },
  73: { text: "Snow", icon: "❄️" },
  75: { text: "Heavy snow", icon: "❄️" },
  77: { text: "Snow grains", icon: "❄️" },
  80: { text: "Rain showers", icon: "🌦️" },
  81: { text: "Rain showers", icon: "🌦️" },
  82: { text: "Heavy showers", icon: "🌧️" },
  95: { text: "Thunderstorm", icon: "⚡" },
  96: { text: "Thunderstorm with hail", icon: "⚡" },
  99: { text: "Severe thunderstorm", icon: "⛈️" },
};

export default function DayForecast({ day }) {
  const date = new Date(day.date);
  const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });
  const shortDate = date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });

  const weather = weatherMap[day.weathercode] || {
    text: "Unknown",
    icon: "🌤️",
  };

  return (
    <div className="group bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 border border-blue-100">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-800">{weekday}</h3>
        <p className="text-sm text-gray-500 mb-3">{shortDate}</p>

        <div className="text-5xl my-4 filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">
          {weather.icon}
        </div>
        
        <p className="font-medium text-gray-700 mb-3 bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-sm inline-block">
          {weather.text}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-orange-500">↑</span>
            <span className="text-xl font-semibold text-gray-800">{day.tempMax}°C</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-blue-500">↓</span>
            <span className="text-lg text-gray-600">{day.tempMin}°C</span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-blue-100">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
            <span>💨</span>
            <span>{day.wind} km/h</span>
          </p>
        </div>
      </div>
    </div>
  );
}

