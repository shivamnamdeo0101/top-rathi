import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';

const headers = { 
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzdiYTdkOWZhNTcyMDAxNjE0NDM3NCIsImlhdCI6MTY2ODc5MDk3NiwiZXhwIjoxNjcxODE0OTc2fQ.QRjfLuX93e7yM54ZW_9Du_8pLiPCTg1nsMHVuuT60UU', 
  'Content-Type': 'application/json'
}
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
    },
    userUpdate:async function({payload,userId}){
      return axios.request({
        method: 'put',
        headers:headers,
        url: `${EndPoint}private/user/${userId}`,
        data: payload,
      })
    },
    userFetch:async function({payload,userId}){
      return axios.request({
        method: 'get',
        headers:headers,
        url: `${EndPoint}private/user/${userId}`,
        data: payload,
      })
    },

    


};