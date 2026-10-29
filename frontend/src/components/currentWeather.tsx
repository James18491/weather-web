import type { weatherData } from "../models/weatherPayload";
import { WEATHER_EMOJI } from "./weatherIcons";

function CurrentWeather({ weather }: { weather: weatherData }) {
  const { current } = weather;
  return (
    <div className="weather-card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <div className="current">
        <span className="emoji">{WEATHER_EMOJI[current.code] ?? "🌍"}</span>
        <span className="temp">{Math.round(current.temperature)}°C</span>
        <span className="desc">{current.description}</span>
      </div>
      <div className="stats">
        <div className="stat">
          <span className="stat-icon">🌡️</span>
          <span className="stat-value">{Math.round(current.feelsLike)}°C</span>
          <span className="stat-label">Feels like</span>
        </div>
        <div className="stat">
          <span className="stat-icon">💧</span>
          <span className="stat-value">{current.humidity}%</span>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="stat">
          <span className="stat-icon">💨</span>
          <span className="stat-value">{Math.round(current.windSpeed)}</span>
          <span className="stat-label">km/h wind</span>
        </div>
      </div>
    </div>
  );
}
export default CurrentWeather;
