import { getEmptyAuthState } from '@/interfaces/IAuthState'
import { createContext } from 'react'

export const AuthContext = createContext({
    auth: getEmptyAuthState(),
    setAuthAuthorized: (token: string) => {
        token
    },
    setAuthUnauthorized: () => {},
    setAuthError: () => {},
})
