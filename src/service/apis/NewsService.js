import axios from 'react-native-axios';
import { EndPoint } from '../../utils/EndPoint';

const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2JiYTE5MjQyMDk4MDAxNGQ3YTgxMyIsImlhdCI6MTY2OTA1Mjk1NCwiZXhwIjoxNjcyMDc2OTU0fQ.WIGPBVZNfvy9ONak1oS0fwSifF3j8bKLYR0uU9doO24',
    'Content-Type': 'application/json'
}
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
    SearchNews: async function (payload) {
          
        return axios.request({
            method: 'get',
            url: `${EndPoint}private/search/${payload}`,
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
        const postId = payload;
        return axios.request({
            method: 'get',
            headers,
            url: `${EndPoint}private/news/${postId}`,

        })
    },


    

};