import axios from 'axios';

const WeatherApp = ({ weatherData, temperatureUnit }) => {
  if (!weatherData) {
    return null;
  }

  const { name, sys, main, weather } = weatherData;
  const temperature = main.temp;

  const handleToggleUnit = () => {
    // Function to toggle temperature unit between Celsius and Fahrenheit
  };

  return (
    <div>
      <h2>{name}</h2>
      <p>
        Country: {sys.country} | Temperature: {temperature}°{temperatureUnit}
      </p>
      <button onClick={handleToggleUnit}>Toggle Unit</button>
    </div>
  );
};

export default WeatherApp;
