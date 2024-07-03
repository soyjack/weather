import React, { useEffect, useState } from "react";
import '../styles.css';
import Weather from '../components/Weather';
import { getWeather } from "../services/apiService";
import axios from "axios";

const WeatherGrid = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [search, setSearch] = useState("");
    const [favoriteWeather, setFavoriteWeather] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("http://localhost:8080/find");
    //             if (!response.ok) {
    //                 throw new Error('Failed to fetch weather data');
    //             }
    //             const data = await response.json();
    //         } catch (error) {
    //             console.error('Error fetching weather data: ', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const states = await getWeather();

                const responses = await Promise.all(
                    states.map(state => (
                        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${state.location},US&appid=e69d5db35d1954eaa724a2fea7c1237e&units=metric`
                        )
                    ))
                );

                const weatherDataArray = responses.map(response => {
                    const { main, weather } = response.data;
                    return {
                        location: response.data.name,
                        image: response.data.name.toLowerCase()+".jpeg",
                        temp: main.temp,
                        description: weather.length > 0 ? weather[0].description : ""
                    };
                });

                // console.log(weatherDataArray);
                setWeatherData(weatherDataArray);
            } catch (error) {
                console.error('Error fetching weather data: ', error);
            }
        };

        fetchData();
    }, []);

    const searchHandler = (e) => {
        setSearch(e.target.value);
    };

    const addToFavorites = (weather) => {
        setFavoriteWeather(prevFavorites => [...prevFavorites, weather]);
    };

    const removeFromFavorites = (weather) => {
        setFavoriteWeather(prevFavorites => prevFavorites.filter(item => item.location !== weather.location));
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const filteredWeather = weatherData.filter(weather =>
        weather.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="navigation">
                <input
                    type="text"
                    placeholder="Search location..."
                    value={search}
                    onChange={searchHandler}
                />
                <button onClick={() => setShowFavorites(false)}>Search</button>
                <button onClick={toggleFavorites}>Favorites ({favoriteWeather.length})</button>
            </div>

            <div className="weather-grid">
                {showFavorites ? (
                    favoriteWeather.map(weather => (
                        <Weather
                            weather={weather}
                            key={weather.location}
                            temp={weather.temp}
                            description={weather.description}
                            isFavorite
                            removeFromFavorites={() => removeFromFavorites(weather)}
                        />
                    ))
                ) : (
                    filteredWeather.map(weather => (
                        <Weather
                            weather={weather}
                            key={weather.location}
                            image={weather.im}
                            temp={weather.temp}
                            description={weather.description}
                            addToFavorites={() => addToFavorites(weather)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default WeatherGrid;
