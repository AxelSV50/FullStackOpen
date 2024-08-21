import axios from "axios";

const API_PATH = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'bd1cd11937e5a1855358ad97a12f0d4f'
const ICON_PATH = 'https://openweathermap.org/img/wn'

const getWeather = (lat, lon) => {

    return axios
    .get(`${API_PATH}?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then(response => {
        return {
            temp: response.data.main.temp, 
            wind: response.data.wind.speed, 
            icon: `${ICON_PATH}/${response.data.weather[0].icon}@2x.png`,
            des: response.data.weather[0].description
        }
     })

}

export default {getWeather}