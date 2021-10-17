import axios from "axios";
import Cookies from "js-cookie";
const {auth_token} = Cookies.get();
export const AxiosAuth = axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1/authorization'
})

export const AxiosPublic = axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1'
})

export const AxiosPrivate =  axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1',
  headers:{"Authorization" : `Bearer ${auth_token}`}
})

// AxiosPrivate.interceptors.request.use(
//   config => {
//     const auth_token = Cookies.get('auth_token');

//     if(auth_token){
//       config.headers.Authorization = `Bearer ${auth_token}`
//     }else{
//       delete AxiosPrivate.defaults.headers.common.Authorization;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// )