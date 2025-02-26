import {createContext, ReactNode, useCallback, useContext, useState} from "react";
import AuthService from "@/services/AuthService.ts";
import axios from "axios";
import {IAuthContext, IAuthResponse, IUser} from "@/models/auth.ts";

const AuthContext = createContext<IAuthContext | null>(null)

const key = 'token'

export function getStoredToken() {
    return localStorage.getItem(key)
}

export function setStoredToken(token: string | null) {
    if (token) {
        localStorage.setItem(key, token)
    } else {
        localStorage.removeItem(key)
    }

}

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null)
    const isAuth = !!user

    const login = useCallback(async (login: string, password: string) => {
        try {
            const response = await AuthService.login(login, password)
            console.log(response)
            setStoredToken(response.data.user.accessToken)
            setUser(response.data.user)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            await AuthService.logout()
            setStoredToken(null)
            setUser(null)
        } catch (e) {
            console.error(e)
        }
    }, [])

    const checkAuth = useCallback(async () => {
        try {
            const response = await axios.get<IAuthResponse>('http://localhost:3001/auth/refresh', {
                withCredentials: true
            })
            console.log(response)
            setStoredToken(response.data.user.accessToken)
            setUser(response.data.user)
        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout, isAuth, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within auth')
    }
    return context
}