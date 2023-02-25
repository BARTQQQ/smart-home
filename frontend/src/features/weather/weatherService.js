import axios from 'axios'

const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=`
const WEATHER_API = '&units=metric&appid=cb178a51268f3ce70bcc754152e57b06&lang=pl'
// wgb96471@nezid.com
// Kurwy123

const getWeather = async (city) => {
    const response = await axios.get(API_URL + city + WEATHER_API)
    return response.data
}

const weatherService = {getWeather}

export default weatherService