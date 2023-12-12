import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../interfaces/IUser'
import { AppState } from '../store'

const initialState: IUser = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.email = action.payload.email
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
            state.id = action.payload.id
        },
        clearUser: (state) => {
            state.id = 0
            state.email = ''
            state.firstName = ''
            state.lastName = ''
        },
    },
})

export const { setUser, clearUser } = userSlice.actions

export const selectUserState = (state: AppState): IUser => state.user

export default userSlice
