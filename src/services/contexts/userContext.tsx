import { IUser, getEmptyUser } from '@/interfaces/IUser'
import { createContext } from 'react'

//Context
export const UserContext = createContext({
    user: getEmptyUser(),
    setUser: (user: IUser) => {
        user
    },
    clearUser: () => {},
})
