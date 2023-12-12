import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'
import ls from 'react-secure-storage'
import { jwtDecode } from 'jwt-decode'

export interface AuthState {
    authStatus: 'AUTHORIZED' | 'ERROR' | 'UNAUTHORIZED'
    token: string
    expTime: string
}

const initialState: AuthState = {
    authStatus: 'UNAUTHORIZED',
    token: '',
    expTime: new Date().toISOString(),
}

interface IAuthLSItem {
    token: string
    expTime: string
}

const tokenToExpDate = (token: string) => {
    const jwtdecoded = jwtDecode(token)
    const expDate = new Date()
    expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
    return expDate.toISOString()
}

const setTokenToLocalStorage = (token: string) => {
    let authLSItem: IAuthLSItem = {
        token: '',
        expTime: new Date().toISOString(),
    }

    if (token !== '')
        authLSItem = {
            token,
            expTime: tokenToExpDate(token),
        }

    ls.setItem('auth-data', authLSItem)

    return authLSItem
}

const getTokenFromLocalStorage = () => {
    const lsValue = ls.getItem('auth-data')

    if ((lsValue as IAuthLSItem).expTime == undefined) return ''

    const authLSItem = lsValue as IAuthLSItem

    if (new Date(authLSItem.expTime) < new Date()) return ''

    return authLSItem
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        trySetAuthTokenFromLS: (state) => {
            const authCookie = getTokenFromLocalStorage()
            if (authCookie) {
                state.authStatus = 'AUTHORIZED'
                state.token = authCookie.token
                state.expTime = authCookie.expTime
            }
        },
        setAuthTokenAuthorized: (state, action: PayloadAction<string>) => {
            state.authStatus = 'AUTHORIZED'
            state.token = action.payload
            state.expTime = setTokenToLocalStorage(action.payload).expTime
        },
        setAuthTokenUnauthorized: (state) => {
            state.authStatus = 'UNAUTHORIZED'
            state.token = ''
            state.expTime = setTokenToLocalStorage('').expTime
        },
        setAuthTokenError: (state) => {
            state.authStatus = 'ERROR'
            state.token = ''
            state.expTime = setTokenToLocalStorage('').expTime
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
    trySetAuthTokenFromLS,
} = authSlice.actions

export const selectAuthState = (state: AppState): AuthState => state.auth

export default authSlice
