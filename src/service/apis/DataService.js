import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';

const  headers = {
    'X-CSCAPI-KEY': 'RnNNbWg2c1dEZnF1NHlpSGVjM3RwVXJmaE05Z1pwUk5HR2Q4RnBvbA==',
    'Content-Type': 'application/json'
}

const url = 'https://api.countrystatecity.in/v1/'

export const DATA_API = {
    
    GetCountries: async function () {
        return axios.request({
            method: 'get',
            url: "https://api.countrystatecity.in/v1/countries",
            headers:headers,
        })
    },
    GetStates: async function (country) {
        return axios.request({
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
            headers:headers,
        })
    },
    GetCities: async function (country,state) {
        return axios.request({
            method: 'get',
            url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
            headers:headers,
        })
    },
 
};