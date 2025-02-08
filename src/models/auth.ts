export interface IAuthResponse {
    message: string,
    user: {
        login: string,
        image: string | null,
        id: string,
        accessToken: string,
        refreshToken: string,
    }
}

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
    checkAuth: () => Promise<void>,
    isAuth: boolean,
}