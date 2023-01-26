import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';


export const SCH_API = {

    SchFetch: async function (payload) {
        return axios.request({
            method: 'post',
            url: `${EndPoint}private/sch-getall`,
            data:payload
        })
    },
    getSchFilter: async function (payload) {
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/filter-get/${payload}`,
        })
    },
    getSchById: async function (payload) {
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/sch/${payload}`,
        })
    },
    
    
    

};