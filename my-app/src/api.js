import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const api = axios.create({
    baseURL: "/choreo-apis/djreact/backend/rest-api-be2/v1"
})
// baseURL: "http://127.0.0.1:8000"
//baseURL: import.meta.env.API_URL


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject("error setting header")
    }
)

export default api