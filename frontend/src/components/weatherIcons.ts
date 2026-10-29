
// icon for weahter_codes from backend response
export const WEATHER_EMOJI: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌦️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  80: '🌦️', 81: '🌧️', 82: '🌧️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};

export function skyClass(code: number): string{
  if(code<=1)return 'sky-clear';
  if(code<=3) return 'sky-cloudy';
  if (code < 60) return 'sky-fog';
  if (code < 70 || code >= 80) return 'sky-rain';
  if (code < 80) return 'sky-snow';
  return 'sky-storm';
}

