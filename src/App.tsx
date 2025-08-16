import React, { useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import { WeatherData } from './types/weather';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWeatherData = (data: WeatherData) => {
    setWeatherData(data);
    setError(null);
  };

  const handleLoading = (isLoading: boolean) => {
    setLoading(isLoading);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setWeatherData(null);
  };

  return (
    <div className="App">
      <div className="weather-container">
        {!weatherData && !loading && (
          <h1 className="app-title">Search in German cities</h1>
        )}
        
        <WeatherSearch
          onWeatherData={handleWeatherData}
          onLoading={handleLoading}
          onError={handleError}
        />

        {loading && (
          <div className="loading">
            <div className="loading-spinner"></div>
            Loading weather data...
          </div>
        )}
        
        {error && <div className="error">{error}</div>}
        {weatherData && !loading && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;
