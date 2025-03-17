import axios from "axios";

const baseURL = "http://localhost:3501/"

const api = axios.create({
    baseURL: baseURL,
})

api.interceptors.request.use(config=>{
    let token = localStorage.getItem("jwt")
    config.headers.Authorization = `bearer ${token}`
    return config
})

export default api