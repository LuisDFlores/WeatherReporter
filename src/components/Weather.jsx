import React, { useState } from 'react';
import axios from 'axios';

const key = process.env.REACT_APP_SECRET

const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (city.trim() !== '') {
            fetchWeatherData();
        }
    };

    const fetchWeatherData = async () => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Weather App</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={handleInputChange}
                />
                <button classname=""type="submit">Get Weather</button>
            </form>

            {weatherData && (
                <div className='information'>
                    <h2>{weatherData.name}</h2>
                    <p>Temperature: {weatherData.main.temp} K</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;