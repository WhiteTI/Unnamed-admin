import axios from "axios";
import {getStoredToken} from "@/components/auth.tsx";

const api = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3000",
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${getStoredToken()}`;
    return config;
})

export default api;