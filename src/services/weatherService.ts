import axios from 'axios';
import { WeatherData, LocationResult, OpenMeteoResponse } from '../types/weather';

const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const searchLocations = async (query: string): Promise<LocationResult[]> => {
  try {
    const response = await axios.get(GEOCODING_API, {
      params: {
        name: query,
        count: 10,
        language: 'en',
        format: 'json',
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error('Error searching locations:', error);
    throw new Error('Failed to search locations');
  }
};

export const getWeatherData = async (
  latitude: number,
  longitude: number,
  locationName: string,
  country: string,
  admin1?: string
): Promise<WeatherData> => {
  try {
    const response = await axios.get<OpenMeteoResponse>(WEATHER_API, {
      params: {
        latitude,
        longitude,
        current: [
          'temperature_2m',
          'weather_code',
          'wind_speed_10m',
          'wind_direction_10m',
          'relative_humidity_2m',
          'surface_pressure',
          'visibility',
          'uv_index',
          'precipitation',
        ].join(','),
        daily: [
          'temperature_2m_max',
          'temperature_2m_min',
          'weather_code',
          'precipitation_sum',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'uv_index_max',
        ].join(','),
        timezone: 'Europe/Berlin',
        forecast_days: 7,
      },
    });

    const data = response.data;
  
    return {
      location: {
        name: locationName,
        latitude,
        longitude,
        country,
        admin1,
      },
      current: {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        windSpeed: Math.round(data.current.wind_speed_10m),
        windDirection: data.current.wind_direction_10m,
        humidity: data.current.relative_humidity_2m,
        pressure: Math.round(data.current.surface_pressure),
        visibility: Math.round(data.current.visibility / 1000), 
        uvIndex: Math.round(data.current.uv_index),
        time: data.current.time,
        precipitation: data.current.precipitation || 0,
        precipitationProbability: data.daily.precipitation_probability_max[0] || 0,
      },
      daily: {
        time: data.daily.time,
        temperatureMax: data.daily.temperature_2m_max.map(temp => Math.round(temp)),
        temperatureMin: data.daily.temperature_2m_min.map(temp => Math.round(temp)),
        weatherCode: data.daily.weather_code,
        precipitation: data.daily.precipitation_sum,
        precipitationProbability: data.daily.precipitation_probability_max,
        windSpeed: data.daily.wind_speed_10m_max.map(speed => Math.round(speed)),
        uvIndex: data.daily.uv_index_max.map(uv => Math.round(uv)),
      },
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new Error('Failed to fetch weather data');
  }
};
