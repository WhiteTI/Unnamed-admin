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