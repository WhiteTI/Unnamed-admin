import axios from "axios";
import {getStoredToken, setStoredToken} from "@/components/auth.tsx";
import {IAuthResponse} from "@/models/auth.ts";

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getStoredToken()}`;
    return config;
})

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !error.config.isRetry) {
        originalRequest.isRetry = true
        try {
            const response = await axios.get<IAuthResponse>('http://localhost:3000/api/auth/refresh', {
                withCredentials: true
            })
            setStoredToken(response.data.user.accessToken)
            return api.request(originalRequest)
        } catch (e) {
            console.log('401')
        }
    }
    throw error;
})

export default api;