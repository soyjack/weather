import axios from 'axios';

const url = "http://localhost:8080";

const getWeather = async () => {
    try {
        const response = await axios.get(`${url}/find`);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data: ', error);
        throw error;
    }
};export { getWeather };
