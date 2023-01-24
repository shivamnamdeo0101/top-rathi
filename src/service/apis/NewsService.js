import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';


export const NEWS_API = {


    FeedFetch: async function (payload) {
        const {page,perPage} = payload;
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/news/${page}/${perPage}`,
        })
    },
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
    SearchNews: async function (payload,pageNo) {
        
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/search/${payload}/${pageNo}`,
        })
    },
    SearchTitle: async function (payload) {
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/search-title/${payload}`,
        })
    },

    AddToCollection: async function (payload) {
          
        return axios.request({
            method: 'post',
            url: `${EndPoint}private/collection`,
            data:payload
        })
    },
    RemToCollection: async function (payload) {
          
        return axios.request({
            method: 'delete',
            url: `${EndPoint}private/collection`,
            data:payload
            
        })
    },
    GetToCollection: async function (payload) {
        const {postId,userId} = payload;
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/collection/${userId}/${postId}`,
        })
    },
    GetPoll: async function (payload) {
        const postId = payload;
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/poll/${postId}`,
        })
    },
    AddPoll: async function (payload) {
        return axios.request({
            method: 'post',
            url: `${EndPoint}private/poll`,
            data:payload

        })
    },
    RemPoll: async function (payload) {
        return axios.request({
            method: 'delete',
            url: `${EndPoint}private/poll`,
            data:payload

        })
    },
    GetNewsById: async function (payload) {
        const {postId,token} = payload;
        const headers = {
            'Authorization': 'Bearer '+token,
            'Content-Type': 'application/json'
        }
        return axios.request({
            method: 'get',
            headers,
            url: `${EndPoint}private/news/${postId}`,

        })
    },


    

};