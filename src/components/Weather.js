import React from 'react';

const Weather = ({ weather, temp, description, addToFavorites, removeFromFavorites, isFavorite }) => {
    return (
        <div className="weather-card">
            {console.log(
                weather.image)}
            <img src={`/images/${weather.image}`} alt={weather.location} className="state-image" />
            <div className="weather-info">
                <h3>{weather.location}</h3>
                <div className="weather-details">
                    <div className="temperature">{temp} °C</div>
                    <div className="description">{description}</div>
                </div>
                {isFavorite ? (
                    <button onClick={removeFromFavorites}>Remove from Favorites</button>
                ) : (
                    <button onClick={addToFavorites}>Add to Favorites</button>
                )}
            </div>
        </div>
    );
};

export default Weather;
