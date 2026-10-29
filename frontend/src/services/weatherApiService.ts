import type { weatherError, weatherResponse } from "../models/weatherPayload";

const API_URL = '/api/weather';

export async function fetchWeatherData(city: string) {
  const response = await fetch(`${API_URL}?city=${encodeURIComponent(city)}`);

  if (!response.ok) {
    const error = (await response.json() as weatherError);
    throw new Error(error.message || error.error || 'Failed to fetch Weather data.');
  }

  const json = (await response.json() as weatherResponse);
  return json.data;
}

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const response = await fetch(`${API_URL}?lat=${lat}&lon=${lon}`);

  if (!response.ok) {
    const error = (await response.json() as weatherError);
    throw new Error(error.message || error.error || 'Failed to fetch Weather data.');
  }

  const json = (await response.json() as weatherResponse);
  return json.data;
}