import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import userSlice from './userSlice'

const rootReducer = combineReducers({
    [authSlice.name]: authSlice.reducer,
    [userSlice.name]: userSlice.reducer,
})

export default rootReducer
