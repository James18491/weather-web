import type { dailyWeather } from '../models/weatherPayload';
import { WEATHER_EMOJI } from './weatherIcons';

function ForecastList({ days }: { days: dailyWeather[] }) {
  return (
    <>
      <h3>5-day forecast</h3>
      <div className="forecast">
        {days.map((day) => (
          <div key={day.date} className="day">
            <p>{day.date}</p>
            <p>{WEATHER_EMOJI[day.code] ?? '🌍'}</p>
            <p>{day.maxTemp}° / {day.minTemp}°</p>
            <p>{day.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ForecastList;