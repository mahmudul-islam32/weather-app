import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchLocations, getWeatherData } from '../services/weatherService';
import { LocationResult } from '../types/weather';

interface WeatherSearchProps {
  onWeatherData: (data: any) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string) => void;
}

const WeatherSearch = ({
  onWeatherData,
  onLoading,
  onError,
}: WeatherSearchProps) => {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<LocationResult[]>([]);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [shouldSearch, setShouldSearch] = React.useState(true);

  React.useEffect(() => {
    const searchTimer = setTimeout(async () => {
      if (query.length >= 2 && shouldSearch) {
        setIsSearching(true);
        try {
          const locations = await searchLocations(query);
          const germanLocations = locations.filter(
            (location) => location.country_code === 'DE'
          );
          setSuggestions(germanLocations);
          setShowSuggestions(true); 
        } catch (error) {
          // Error searching locations
          setSuggestions([]);
          setShowSuggestions(true); 
        } finally {
          setIsSearching(false);
        }
      } else if (query.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query, shouldSearch]);

  const handleLocationSelect = async (location: LocationResult, event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    setShowSuggestions(false);
    setSuggestions([]);
    setShouldSearch(false);
    
    setQuery(location.name);

    onLoading(true);
    try {
      const weatherData = await getWeatherData(
        location.latitude,
        location.longitude,
        location.name,
        location.country,
        location.admin1
      );
      onWeatherData(weatherData);
    } catch (error) {
      onError('Failed to fetch weather data for this location');
    } finally {
      onLoading(false);
    }
  };

  const handleSearch = async () => {
    if (query.length < 2) {
      onError('Please enter at least 2 characters');
      return;
    }

    onLoading(true);
    try {
      const locations = await searchLocations(query);
      const germanLocations = locations.filter(
        (location) => location.country_code === 'DE'
      );

      if (germanLocations.length === 0) {
        onError('No German locations found for your search');
        return;
      }

      const location = germanLocations[0];
      const weatherData = await getWeatherData(
        location.latitude,
        location.longitude,
        location.name,
        location.country,
        location.admin1
      );
      onWeatherData(weatherData);
      setShowSuggestions(false);
    } catch (error) {
      onError('Failed to fetch weather data');
    } finally {
      onLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
            setShouldSearch(true); 
          }}
          onKeyPress={handleKeyPress}
          placeholder="Search German cities..."
          className="search-input"
        />
        
        {isSearching && query.length >= 2 && (
          <div className="search-suggestions">
            <div className="search-loading">
              Searching locations...
            </div>
          </div>
        )}
        
        {showSuggestions && !isSearching && (
          <div className="search-suggestions">
            {suggestions.length > 0 ? (
              suggestions.map((location: LocationResult) => (
                <div
                  key={`${location.latitude}-${location.longitude}`}
                  onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => handleLocationSelect(location, e)}
                  className="suggestion-item"
                >
                  <div className="suggestion-name">{location.name}</div>
                  {location.admin1 && (
                    <div className="suggestion-details">
                      {location.admin1}, {location.country}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="no-results-message">
                No German cities found for "{query}"
              </div>
            )}
          </div>
        )}
      </div>
      
      <button onClick={handleSearch} className="search-button">
        <FontAwesomeIcon icon={faSearch} style={{ marginRight: '8px' }} />
        Get Weather
      </button>
    </div>
  );
};

export default WeatherSearch;
