
import axios from 'axios'

const API_PATH = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () =>{

    return axios.get(`${API_PATH}/all`).then(response => response.data)
}

export default {getAll}