# Weather Web

weather app i built to learn fullstack. search any city or let the browser detect
your location automatically. shows current weather + 5 day forecast.

backend is node/express, it calls the Open-Meteo api (free, no api key needed)
and sends clean json to the frontend.

## stack

- frontend: react + typescript (vite)
- backend: express, axios
- data: open-meteo (weather + city search), bigdatacloud (reverse geocoding for location name)

## run it

backend, port 5000:

    cd backend
    npm install
    npm start

frontend, port 5173:

    cd frontend
    npm install
    npm run dev

open http://localhost:5173
allow location permission for auto detect, or just search a city.

## api

    GET /api/weather?city=Seoul
    GET /api/weather?lat=21.9&lon=96.1

response:

    {
      "success": true,
      "data": {
        "city": "Seoul",
        "country": "South Korea",
        "current": { "temperature": 18.4, "feelsLike": 17.9, "humidity": 55,
                     "windSpeed": 12.3, "code": 2, "description": "Partly cloudy" },
        "daily": [ 5 days: date, maxTemp, minTemp, code, description ]
      }
    }