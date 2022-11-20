import axios from "axios";
import { useSelector } from "react-redux";

const token = useSelector(state=>state.userAuth.user.token)
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(user){
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
axios.interceptors.response.use(function (config) {
  // Do something before request is sent
  if(user){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
