import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'
import { getCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

export enum AuthStatus {
    AUTHORIZED = 'AUTHORIZED',
    ERROR = 'ERROR',
    UNAUTHORIZED = 'UNAUTHORIZED',
}

export interface AuthState {
    authStatus: AuthStatus
    token: string
}

const initialState: AuthState = {
    authStatus: AuthStatus.UNAUTHORIZED,
    token: '',
}

const setTokenToCookie = (token: string) => {
    const jwtdecoded = jwtDecode(token)
    const expDate = new Date()
    expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
    setCookie('auth-token', token, {
        secure: true,
        httpOnly: true,
        expires: expDate,
    })
}

const getTokenFromCookie = () => getCookie('auth-token')

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        trySetAuthTokenFromCookie: (state) => {
            const authCookie = getTokenFromCookie()
            if (authCookie) {
                state.authStatus = AuthStatus.AUTHORIZED
                state.token = authCookie
            }
        },
        setAuthTokenAuthorized: (state, action) => {
            state.authStatus = AuthStatus.AUTHORIZED
            state.token = action.payload
            setTokenToCookie(action.payload)
        },
        setAuthTokenUnauthorized: (state) => {
            state.authStatus = AuthStatus.UNAUTHORIZED
            state.token = ''
            setTokenToCookie('')
        },
        setAuthTokenError: (state) => {
            state.authStatus = AuthStatus.ERROR
            state.token = ''
            setTokenToCookie('')
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.auth,
            }
        },
    },
})

export const {
    setAuthTokenAuthorized,
    setAuthTokenUnauthorized,
    setAuthTokenError,
    trySetAuthTokenFromCookie,
} = authSlice.actions

export const selectAuthState = (state: AppState): AuthState => state.auth

export default authSlice.reducer
