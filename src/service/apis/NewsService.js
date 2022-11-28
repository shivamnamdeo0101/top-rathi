import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';

const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2JiYTE5MjQyMDk4MDAxNGQ3YTgxMyIsImlhdCI6MTY2OTA1Mjk1NCwiZXhwIjoxNjcyMDc2OTU0fQ.WIGPBVZNfvy9ONak1oS0fwSifF3j8bKLYR0uU9doO24',
    'Content-Type': 'application/json'
}
export const NEWS_API = {

    slideFetch: async function () {
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/slide`,
        })
    },
    InsightFetch: async function () {
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/insight`,
        })
    },
    SearchNews: async function (payload) {
          
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/search${payload}`,
        })
    },

};