export interface WeatherData {
  location: {
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string; 
  };
  current: {
    temperature: number;
    weatherCode: number;
    windSpeed: number;
    windDirection: number;
    humidity: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    time: string;
    precipitation: number;
    precipitationProbability: number;
  };
  daily: {
    time: string[];
    temperatureMax: number[];
    temperatureMin: number[];
    weatherCode: number[];
    precipitation: number[];
    precipitationProbability: number[];
    windSpeed: number[];
    uvIndex: number[];
  };
}

export interface LocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
  country_code: string;
}

export interface OpenMeteoResponse {
  current: {
    time: string;
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    relative_humidity_2m: number;
    surface_pressure: number;
    visibility: number;
    uv_index: number;
    precipitation: number;
  };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_sum: number[];
    precipitation_probability_max: number[];
    wind_speed_10m_max: number[];
    uv_index_max: number[];
  };
}

export const WeatherCodes: { [key: number]: { description: string; icon: string } } = {
  0: { description: 'Clear sky', icon: 'sun' },
  1: { description: 'Mainly clear', icon: 'sun' },
  2: { description: 'Partly cloudy', icon: 'cloud-sun' },
  3: { description: 'Overcast', icon: 'cloud' },
  45: { description: 'Fog', icon: 'smog' },
  48: { description: 'Depositing rime fog', icon: 'smog' },
  51: { description: 'Light drizzle', icon: 'cloud-rain' },
  53: { description: 'Moderate drizzle', icon: 'cloud-rain' },
  55: { description: 'Dense drizzle', icon: 'cloud-rain' },
  56: { description: 'Light freezing drizzle', icon: 'snowflake' },
  57: { description: 'Dense freezing drizzle', icon: 'snowflake' },
  61: { description: 'Slight rain', icon: 'cloud-rain' },
  63: { description: 'Moderate rain', icon: 'cloud-rain' },
  65: { description: 'Heavy rain', icon: 'cloud-showers-heavy' },
  66: { description: 'Light freezing rain', icon: 'snowflake' },
  67: { description: 'Heavy freezing rain', icon: 'snowflake' },
  71: { description: 'Slight snow fall', icon: 'snowflake' },
  73: { description: 'Moderate snow fall', icon: 'snowflake' },
  75: { description: 'Heavy snow fall', icon: 'snowflake' },
  77: { description: 'Snow grains', icon: 'snowflake' },
  80: { description: 'Slight rain showers', icon: 'cloud-sun-rain' },
  81: { description: 'Moderate rain showers', icon: 'cloud-rain' },
  82: { description: 'Violent rain showers', icon: 'cloud-bolt' },
  85: { description: 'Slight snow showers', icon: 'snowflake' },
  86: { description: 'Heavy snow showers', icon: 'snowflake' },
  95: { description: 'Thunderstorm', icon: 'cloud-bolt' },
  96: { description: 'Thunderstorm with slight hail', icon: 'cloud-bolt' },
  99: { description: 'Thunderstorm with heavy hail', icon: 'cloud-bolt' },
};
