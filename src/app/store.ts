import rootReducer from '@/app/reducer'
import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'

export const store = () =>
    configureStore({
        reducer: rootReducer,
        devTools: true,
    })

export type AppStore = ReturnType<typeof store>
export type AppState = ReturnType<AppStore['getState']>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>

export const wrapper = createWrapper<AppStore>(store)
