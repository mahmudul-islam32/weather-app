import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDroplet, 
  faWind, 
  faEye, 
  faCalendarDays,
  faCalendarXmark,
  faSun,
  faCloud,
  faCloudSun,
  faCloudRain,
  faCloudShowersHeavy,
  faCloudSunRain,
  faCloudBolt,
  faSnowflake,
  faSmog
} from '@fortawesome/free-solid-svg-icons';
import { WeatherCodes } from '../types/weather';
import Calendar from './Calendar';

const WeatherDisplay = ({ weatherData }: any) => {
  const { location, current, daily } = weatherData;
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  
  const currentWeather = WeatherCodes[current.weatherCode] || {
    description: 'Unknown',
    icon: '❓',
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  };

  const formatFullDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric'
    });
  };

  const formatForecastDate = (dateString: string, dayIndex: number): string => {
    const date = new Date(dateString);
    if (dayIndex === 0) return 'Today';
    if (dayIndex === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDateTime = (dateTimeString: string): string => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getWeatherIcon = (weatherCode: number) => {
    const iconMap: { [key: number]: any } = {
      0: faSun,           // Clear sky
      1: faCloudSun,      // Mainly clear
      2: faCloudSun,      // Partly cloudy
      3: faCloud,         // Overcast
      45: faSmog,         // Fog
      48: faSmog,         // Depositing rime fog
      51: faCloudSunRain, // Light drizzle
      53: faCloudRain,    // Moderate drizzle
      55: faCloudShowersHeavy, // Dense drizzle
      61: faCloudRain,    // Slight rain
      63: faCloudRain,    // Moderate rain
      65: faCloudShowersHeavy, // Heavy rain
      71: faSnowflake,    // Slight snow
      73: faSnowflake,    // Moderate snow
      75: faSnowflake,    // Heavy snow
      95: faCloudBolt,    // Thunderstorm
      96: faCloudBolt,    // Thunderstorm with slight hail
      99: faCloudBolt     // Thunderstorm with heavy hail
    };
    
    return iconMap[weatherCode] || faCloud;
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDaySelect = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
  };

  const handleCalendarDateSelect = (date: string) => {
    const selectedDate = new Date(date);
    const todayDate = new Date(daily.time[0]);
    const diffTime = selectedDate.getTime() - todayDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays >= 0 && diffDays < 7) {
      setSelectedDayIndex(diffDays);
    }
    setShowCalendar(false);
  };

  const getExtendedDates = () => {
    const dates = [];
    const startDate = new Date(daily.time[0]);
    
    for (let i = 0; i < 30; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  const selectedDayWeather = {
    date: daily.time[selectedDayIndex] || daily.time[0],
    tempMax: daily.temperatureMax[selectedDayIndex] || daily.temperatureMax[0],
    tempMin: daily.temperatureMin[selectedDayIndex] || daily.temperatureMin[0],
    weatherCode: daily.weatherCode[selectedDayIndex] || daily.weatherCode[0],
    precipitation: daily.precipitation[selectedDayIndex] || daily.precipitation[0],
    precipitationProbability: daily.precipitationProbability[selectedDayIndex] || daily.precipitationProbability[0],
    windSpeed: daily.windSpeed[selectedDayIndex] || daily.windSpeed[0],
    humidity: selectedDayIndex === 0 ? current.humidity : 65 + Math.floor(Math.random() * 20)
  };

  const selectedWeather = WeatherCodes[selectedDayWeather.weatherCode] || currentWeather;

  const getNext7Days = (startIndex: number = 0) => {
    const result = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = startIndex + i;
      if (dayIndex < daily.time.length) {
        result.push({
          index: dayIndex,
          date: daily.time[dayIndex],
          tempMax: daily.temperatureMax[dayIndex],
          tempMin: daily.temperatureMin[dayIndex],
          weatherCode: daily.weatherCode[dayIndex],
          precipitation: daily.precipitation[dayIndex],
          precipitationProbability: daily.precipitationProbability[dayIndex],
          windSpeed: daily.windSpeed[dayIndex],
          uvIndex: daily.uvIndex[dayIndex]
        });
      } else {
        // Generate estimated data for days beyond API data
        const baseDate = new Date(daily.time[daily.time.length - 1]);
        baseDate.setDate(baseDate.getDate() + (dayIndex - daily.time.length + 1));
        
        result.push({
          index: dayIndex,
          date: baseDate.toISOString().split('T')[0],
          tempMax: daily.temperatureMax[daily.temperatureMax.length - 1] + Math.floor(Math.random() * 6 - 3),
          tempMin: daily.temperatureMin[daily.temperatureMin.length - 1] + Math.floor(Math.random() * 6 - 3),
          weatherCode: daily.weatherCode[daily.weatherCode.length - 1],
          precipitation: daily.precipitation[daily.precipitation.length - 1],
          precipitationProbability: daily.precipitationProbability[daily.precipitationProbability.length - 1],
          windSpeed: daily.windSpeed[daily.windSpeed.length - 1],
          uvIndex: daily.uvIndex[daily.uvIndex.length - 1]
        });
      }
    }
    return result;
  };

  const next7Days = getNext7Days(selectedDayIndex);

  return (
    <div className="weather-display">
      <div className="current-weather">
        <div className="location-info">
          {location.name}
          {location.admin1 && `, ${location.admin1}`}
        </div>
        
        <div className="main-temp">{Math.round((selectedDayWeather.tempMax + selectedDayWeather.tempMin) / 2)}°</div>
        
        <div className="weather-description">
          {selectedWeather.description}
        </div>
        
        <div className="current-time">
          {selectedDayIndex === 0 ? formatDateTime(current.time) : formatFullDate(selectedDayWeather.date)}
        </div>
        
        <div className="temp-range">
          {selectedDayWeather.tempMax}° / {selectedDayWeather.tempMin}°
        </div>

        {/* Weather Details Section */}
        <div className="weather-details">
          <div className="detail-item">
            <FontAwesomeIcon icon={faDroplet} className="detail-icon" />
            <span className="detail-label">Precipitation</span>
            <span className="detail-value">{Math.round(selectedDayWeather.precipitationProbability)}%</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faEye} className="detail-icon" />
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{selectedDayWeather.humidity}%</span>
          </div>
          <div className="detail-item">
            <FontAwesomeIcon icon={faWind} className="detail-icon" />
            <span className="detail-label">Wind</span>
            <span className="detail-value">{selectedDayWeather.windSpeed} km/h</span>
          </div>
        </div>
      </div>

      <div className="hourly-forecast">
        <div className="hourly-title">
          {selectedDayIndex === 0 ? 'Today - Hourly forecast' : `${formatFullDate(selectedDayWeather.date)} - Forecast`}
        </div>
        <div className="hourly-items">
          {[...Array(4)].map((_, index) => {
            let hourString, temp, icon;
            
            if (selectedDayIndex === 0) {
              // For today, show actual hourly progression
              const currentHour = new Date();
              currentHour.setHours(currentHour.getHours() + (index * 3));
              hourString = currentHour.toLocaleTimeString('en-US', { 
                hour: 'numeric',
                hour12: true 
              });
              
              // Simulate hourly temperature variation
              const tempVariation = [
                current.temperature, // Now
                current.temperature + 1, // +3h
                current.temperature + 2, // +6h
                current.temperature - 1, // +9h
              ];
              temp = Math.round(tempVariation[index]);
              icon = getWeatherIcon(current.weatherCode);
            } else {
              // For other days, show day progression simulation
              const timeLabels = ['9 AM', '12 PM', '3 PM', '6 PM'];
              hourString = timeLabels[index];
              
              const baseTemp = (selectedDayWeather.tempMax + selectedDayWeather.tempMin) / 2;
              const tempVariation = [
                selectedDayWeather.tempMin + 5, // 9 AM  
                selectedDayWeather.tempMax - 1, // 12 PM
                selectedDayWeather.tempMax,     // 3 PM
                selectedDayWeather.tempMax - 3, // 6 PM
              ];
              temp = Math.round(tempVariation[index]);
              icon = getWeatherIcon(selectedDayWeather.weatherCode);
            }
            
            return (
              <div key={index} className="hourly-item">
                <div className="hourly-time">
                  {hourString}
                </div>
                <div className="hourly-icon">
                  <FontAwesomeIcon icon={icon} />
                </div>
                <div className="hourly-temp">
                  {temp}°
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="forecast">
        <div className="forecast-header">
          <div className="forecast-title">7-day forecast</div>
          <button onClick={toggleCalendar} className="calendar-toggle-button">
            <FontAwesomeIcon 
              icon={showCalendar ? faCalendarXmark : faCalendarDays}
            />
          </button>
        </div>
        
        {showCalendar && (
          <Calendar
            selectedDate={selectedDayWeather.date}
            onDateSelect={handleCalendarDateSelect}
            availableDates={getExtendedDates()}
          />
        )}
        
        <div className="forecast-days">
          {next7Days.map((day, index) => {
            const weather = WeatherCodes[day.weatherCode] || {
              description: 'Unknown',
              icon: 'cloud',
            };
            
            const isSelected = day.index === selectedDayIndex;
            
            return (
              <div 
                key={day.date} 
                className={`forecast-day ${isSelected ? 'selected' : ''}`}
                onClick={() => handleDaySelect(day.index)}
              >
                <div className="forecast-date">
                  {formatForecastDate(day.date, day.index)}
                </div>
                <div className="forecast-icon">
                  <FontAwesomeIcon icon={getWeatherIcon(day.weatherCode)} />
                </div>
                <div className="forecast-temps">
                  <span className="forecast-high">{day.tempMax}°</span>
                  <span className="forecast-low">/{day.tempMin}°</span>
                </div>
                <div className="forecast-details">
                  <div className="forecast-detail">
                    <FontAwesomeIcon icon={faDroplet} style={{ marginRight: '4px' }} />
                    {Math.round(day.precipitationProbability || 0)}%
                  </div>
                  <div className="forecast-detail">
                    <FontAwesomeIcon icon={faWind} style={{ marginRight: '4px' }} />
                    {day.windSpeed} km/h
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
