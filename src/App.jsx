import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherApp from './components/WeatherApp';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState('Celsius');
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState('');

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherData);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    const getWeatherData = async (position) => {
      const { latitude, longitude } = position.coords;
      const apiKey = 'c5f590d57553377e83cc179157aa83f6';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    getLocation();
  }, []);

  const handleToggleUnit = () => {
    setTemperatureUnit((prevUnit) => (prevUnit === 'Celsius' ? 'Fahrenheit' : 'Celsius'));
  };

  const handleSearch = async () => {
    if (city.trim() !== '') {
      const apiKey = 'c5f590d57553377e83cc179157aa83f6';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    

    <div>

     <h1 className="h1">Weather App</h1>
    
    <div>
    <input type="text" id="cityInput" value={city} onChange={(e) => setCity(e.target.value)} />

    
    </div>
      <div className="container">
      
        <div>
          <label htmlFor="cityInput">City:</label>
          
          <button onClick={handleSearch}>Search</button>
          
        </div>
        <WeatherApp weatherData={weatherData} temperatureUnit={temperatureUnit} />
      </div>
    </div>
  );
};

export default App;
