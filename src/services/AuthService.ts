import api from "@/http/index.ts";
import {AxiosResponse} from "axios";
import {IAuthResponse} from "@/models/auth.ts";

export default class AuthService {
    static async login(login: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        return api.post<IAuthResponse>('/auth/login', { login, password })
    }

    static async logout() {
        await api.post('/auth/logout');
    }
}