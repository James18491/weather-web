import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { fetchWeatherData, fetchWeatherByCoords } from './services/weatherApiService';
import { skyClass } from './components/weatherIcons';
import SearchForm from './components/searchForm';
import CurrentWeather from './components/currentWeather';
import ForecastList from './components/forecastList';
import type { weatherData } from './models/weatherPayload';

function App() {
  const [weather, setWeather] = useState<weatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // the shared loader
  const loadWeather = useCallback(async (fetcher: () => Promise<weatherData>) => {
    setLoading(true);
    setError('');
    setWeather(null);
    try {
      setWeather(await fetcher());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  // city search
  const handleSearch = useCallback((city: string) => {
    loadWeather(() => fetchWeatherData(city));
  }, [loadWeather]);

  // geolocation 
  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => loadWeather(() => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude)),
      (err) => {
        setLoading(false);
        const messages: Record<number, string> = {
          1: 'Location permission denied — search a city instead.',
          2: 'Location unavailable — search a city instead.',
          3: 'Location request timed out — search a city instead.',
        };
        setError(messages[err.code] || 'Location failed — search a city instead.');
      },
      { timeout: 8000, maximumAge: 600000 },
    );
  }, [loadWeather]);

  // run once on first render
  useEffect(() => {
    handleMyLocation();
  }, [handleMyLocation]);

  return (
    <div className={`app ${weather ? skyClass(weather.current.code) : ''}`}>
      <h1>🌤️ Weather Web</h1>

      <SearchForm onSearch={handleSearch} onLocation={handleMyLocation} loading={loading} />

      {error && <p className="error">{error}</p>}

      {weather && (
        <>
          <CurrentWeather weather={weather} />
          <ForecastList days={weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;