import api from "@/http/index.ts";
import {AxiosResponse} from "axios";

interface IAuthResponse {
    message: string,
    user: {
        login: string,
        image: string | null,
        id: string,
        accessToken: string,
        refreshToken: string,
    }
}

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/auth/login', { login, password })
    }

    static async logout() {
        await api.post('/auth/logout');
    }
}