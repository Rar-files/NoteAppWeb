import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { AppState } from '../app/store'

export interface AuthState {
    succeeded: boolean
    token: string
}

const initialState: AuthState = {
    succeeded: false,
    token: process.env.NEXT_PUBLIC_TEMP_API_TOKEN as string,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.succeeded = action.payload
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

export const { setAuthState } = authSlice.actions

export const selectAuthState = (state: AppState): AuthState => state.auth

export default authSlice.reducer
