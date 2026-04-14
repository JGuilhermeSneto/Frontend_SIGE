import axios from 'axios'

const ACCESS_TOKEN_KEY = 'SIGE_ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'SIGE_REFRESH_TOKEN'
const baseURL = import.meta.env.VITE_API_URL ?? ''

const tokenClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export function setAuthTokens({ access, refresh }) {
    if (access) {
        localStorage.setItem(ACCESS_TOKEN_KEY, access)
    }
    if (refresh) {
        localStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    }
}

export function clearAuthTokens() {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export async function loginWithJwt(email, password) {
    const response = await tokenClient.post('/api/token/', {
        email,
        password,
    })
    setAuthTokens(response.data)
    return response.data
}

export async function refreshAccessToken() {
    const refresh = getRefreshToken()
    if (!refresh) {
        throw new Error('Refresh token ausente')
    }
    const response = await tokenClient.post('/api/token/refresh/', {
        refresh,
    })
    setAuthTokens({ access: response.data.access, refresh })
    return response.data.access
}

export function isAuthenticated() {
    return Boolean(getAccessToken())
}
