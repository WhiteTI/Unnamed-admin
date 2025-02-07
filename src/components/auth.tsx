import {createContext, ReactNode, useCallback, useContext, useState} from "react";
import AuthService from "@/services/AuthService.ts";

export interface IUser {
    login: string,
    image: string | null,
    id: string,
    accessToken: string,
    refreshToken: string,
}

export interface IAuthContext {
    user: IUser | null,
    login: (login: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    isAuth: boolean,
}

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
            setStoredToken(response.data.user.accessToken)
            setUser(response.data.user)
        } catch (e) {
            // @ts-ignore
            console.log(e.response)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            await AuthService.logout()
            setStoredToken(null)
            setUser(null)
        } catch (e) {
            // @ts-ignore
            console.log(e.response)
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, login, logout, isAuth}}>
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