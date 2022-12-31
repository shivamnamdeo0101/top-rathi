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
    },
    userUpdate:async function({payload,userId}){
      return axios.request({
        method: 'put',
        headers:headers,
        url: `${EndPoint}private/user/${userId}`,
        data: payload,
      })
    },
    userFetch:async function(payload){
      const {userId,token} = payload; 
      const headers = { 
        'Authorization': 'Bearer '+token, 
        'Content-Type': 'application/json'
      }
      
      return axios.request({
        method: 'get',
        headers:headers,
        url: `${EndPoint}private/user/${userId}`,
      })
    },
    userGetCollection:async function(payload){
      const userId = payload;
      return axios.request({
        method: 'get',
        url: `${EndPoint}private/collection/${userId}`,
      })
    },
    userUpdateProfileImg:async function(payload){
      return axios.request({
        method: 'put',
        url: `${EndPoint}private/profile-img/`,
        data:payload
      })
    },
    userGetProfileImg:async function(payload){
      const {userId} = payload;
      return axios.request({
        method: 'get',
        url: `${EndPoint}private/profile-img/${userId}`,
      })
    },
    userForgotPass:async function(payload){
      return axios.request({
        method: 'post',
        url: `${EndPoint}auth/forgotpassword`,
        data:payload
      })
    },
    userSendEmailVerifyLink:async function(payload){
      return axios.request({
        method: 'post',
        url: `${EndPoint}auth/send-emailverification`,
        data:payload
      })
    },

    userSendToken:async function(payload){
      return axios.request({
        method: 'put',
        url: `${EndPoint}private//notify-token-update`,
        data:payload
      })
    },
    
    userSuccess:async function(payload){
      const {userId,isSuccess} = payload;
      return axios.request({
        method: 'put',
        url: `${EndPoint}private/success/${userId}`,
        data:payload
      })
    },

    


    

   


      
    


};