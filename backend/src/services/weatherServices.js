const axios = require("axios");

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const REVERSE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

const WEATHER_CODES = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Rime fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Light showers",
  81: "Showers",
  82: "Heavy showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with heavy hail",
};

// shared: coordinates -> shaped weather (used by BOTH modes)
async function getForecast(lat, lon) {
  const forecastResponse = await axios.get(FORECAST_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current:
        "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m",
      daily: "weather_code,temperature_2m_max,temperature_2m_min",
      timezone: "auto",
      forecast_days: 5,
    },
  });

  const current = forecastResponse.data.current;
  const daily = forecastResponse.data.daily;

  return {
    current: {
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      code: current.weather_code,
      description: WEATHER_CODES[current.weather_code] || "Unknown",
    },
    daily: daily.time.map((date, i) => ({
      date,
      maxTemp: daily.temperature_2m_max[i],
      minTemp: daily.temperature_2m_min[i],
      code: daily.weather_code[i],
      description: WEATHER_CODES[daily.weather_code[i]] || "Unknown",
    })),
  };
}

// mode 1: city name search
async function fetchWeather(city) {
  const geoResponse = await axios.get(GEOCODING_URL, {
    params: { name: city, count: 1 },
  });
  const geo = geoResponse.data.results?.[0];
  if (!geo) throw new Error("City not found");

  const weather = await getForecast(geo.latitude, geo.longitude);
  return { city: geo.name, country: geo.country, ...weather };
}

// mode 2: coordinates (for geolocation)
async function fetchWeatherByCoords(lat, lon) {
  let cityName = "My Location";
  let countryName = "";

  try {
    const reverseResponse = await axios.get(REVERSE_URL, {
      params: { latitude: lat, longitude: lon, localityLanguage: "en" },
    });
    cityName =
      reverseResponse.data.city || reverseResponse.data.locality || cityName;
    countryName = reverseResponse.data.countryName || "";
  } catch (error) {
    // reverse name is nice-to-have — weather still works with the fallback name
  }

  const weather = await getForecast(lat, lon);
  return { city: cityName, country: countryName, ...weather };
}

module.exports = { fetchWeather, fetchWeatherByCoords };
