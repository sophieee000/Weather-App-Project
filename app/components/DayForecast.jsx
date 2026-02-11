
"use client";

const weatherMap = {
0: { text: "Clear sky", icon: "" },
1: { text: "Mainly clear", icon: "" },
2: { text: "Partly cloudy", icon: "" },
3: { text: "Overcast", icon: "" },
45: { text: "Fog", icon: "" },
48: { text: "Fog", icon: "" },
51: { text: "Light drizzle", icon: "" },
61: { text: "Rain", icon: "" },
71: { text: "Snow", icon: "" },
80: { text: "Rain showers", icon: "" },
};

export default function DayForecast({ day }) {
    const date = new Date(day.date);
    const weekday = date.toLocaleDateString("en-GB", { weekday: "long" });

    const weather = weatherMap[day.weathercode] || {
        text: "Unknown",
        icon: "",
    };

    return (
        <div className="bg-white p-4 rounded shadow text-center">
            <h3 className="font-semibold">{weekday}</h3>
            <p className="text-sm text-gray-500">{day.date}</p>

            <div className="text-4xl my-2">{weather.icon}</div>
            <p className="mb-2">{weather.text}</p>

            <p> {day.tempMax}°C / {day.tempMin}°C</p>
            <p> Wind: {day.wind} km/h</p>
        </div>
    );
}