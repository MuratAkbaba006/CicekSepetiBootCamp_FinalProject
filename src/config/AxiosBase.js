import axios from "axios";
import Cookie from "js-cookie";
const {auth_token} = Cookie.get();
export const AxiosAuth = axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1/authorization'
})

export const AxiosPublic = axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1'
})

export const AxiosPrivate = axios.create({
  baseURL:'http://bootcampapi.techcs.io/api/fe/v1',
  headers:{"Authorization" : `Bearer ${auth_token}`}
})