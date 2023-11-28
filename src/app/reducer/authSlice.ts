import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../store'

export interface AuthState {
    succeeded: boolean
    token: string
}

const initialState: AuthState = {
    succeeded: false,
    token: '',
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthTokenSuccess: (state, action) => {
            state.succeeded = true
            state.token = action.payload
        },
        setAuthTokenError: (state) => {
            state.succeeded = false
            state.token = ''
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

export const { setAuthTokenSuccess, setAuthTokenError } = authSlice.actions

export const selectAuthState = (state: AppState): AuthState => state.auth

export default authSlice.reducer
