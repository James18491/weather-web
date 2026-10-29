export interface dailyWeather {
    date: string;
    maxTemp: number;
    minTemp: number;
    code: number;
    description: string;
}

export interface currentWeather {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    code: number;
    description: string;
}

export interface weatherData {
    city: string;
    country: string;
    current: currentWeather;
    daily: dailyWeather[];
};
export interface weatherResponse {
    success: boolean;
    data: weatherData;
}

export interface weatherError {
    success: boolean;
    message?: string;
    error?: string;
}