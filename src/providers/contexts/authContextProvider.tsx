import { IAuthState } from '@/interfaces/IAuthState'
import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'

const getEmptyAuth = (): IAuthState => {
    return {
        authStatus: 'UNAUTHORIZED',
        token: '',
        expTime: new Date().toISOString(),
    }
}

export const AuthContext = createContext({
    auth: getEmptyAuth(),
    setAuthAuthorized: (token: string) => {
        token
    },
    setAuthUnauthorized: () => {},
    setAuthError: () => {},
    trySetAuthTokenFromLS: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<IAuthState>(getEmptyAuth())

    const tokenToExpDate = (token: string) => {
        const jwtdecoded = jwtDecode(token)
        const expDate = new Date()
        expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
        return expDate.toISOString()
    }

    const setAuthAuthorized = (token: string) => {
        setAuth({
            authStatus: 'AUTHORIZED',
            token: token,
            expTime: tokenToExpDate(token),
        })
    }
    const setAuthUnauthorized = () => {
        setAuth({
            ...getEmptyAuth(),
            authStatus: 'UNAUTHORIZED',
        })
    }
    const setAuthError = () => {
        setAuth({
            ...getEmptyAuth(),
            authStatus: 'ERROR',
        })
    }
    const trySetAuthTokenFromLS = () => {}

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuthAuthorized,
                setAuthUnauthorized,
                setAuthError,
                trySetAuthTokenFromLS,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
