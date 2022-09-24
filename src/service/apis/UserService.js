import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';
export const API = {
    userRegister: async function (payload) {
        return axios.request({
            method: 'post',
            url: `${EndPoint}auth/register`,
            data: payload,
        })
    },
    userLogin:async function(payload){
      return axios.request({
        method: 'post',
        url: `${EndPoint}auth/login`,
        data: payload,
        
      })
    }

};