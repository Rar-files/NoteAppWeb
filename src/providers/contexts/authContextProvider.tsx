import { IAuthData } from '@/interfaces/IAuthData'
import { IAuthState } from '@/interfaces/IAuthState'
import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import ls from 'react-secure-storage'

const getEmptyAuthState = (): IAuthState => {
    return {
        authStatus: 'UNAUTHORIZED',
        authData: {
            token: '',
            expTime: new Date().toISOString(),
        },
    }
}

const tryGetAuthStateFromLS = (): IAuthState => {
    const authDataLS = ls.getItem('auth-data') as IAuthData | null

    if (!authDataLS) return getEmptyAuthState()

    if (new Date(authDataLS.expTime) < new Date()) return getEmptyAuthState()

    return {
        authStatus: 'AUTHORIZED',
        authData: authDataLS,
    }
}

export const AuthContext = createContext({
    auth: getEmptyAuthState(),
    setAuthAuthorized: (token: string) => {
        token
    },
    setAuthUnauthorized: () => {},
    setAuthError: () => {},
})

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<IAuthState>(tryGetAuthStateFromLS())

    const tokenToExpDate = (token: string) => {
        const jwtdecoded = jwtDecode(token)
        const expDate = new Date()
        expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
        return expDate.toISOString()
    }

    const setAuthStateWithLS = (authState: IAuthState) => {
        ls.setItem('auth-data', authState.authData)
        setAuth(authState)
    }

    const setAuthAuthorized = (token: string) => {
        setAuthStateWithLS({
            authStatus: 'AUTHORIZED',
            authData: {
                token: token,
                expTime: tokenToExpDate(token),
            },
        })
    }
    const setAuthUnauthorized = () => {
        setAuthStateWithLS(getEmptyAuthState())
    }
    const setAuthError = () => {
        setAuthStateWithLS({
            ...getEmptyAuthState(),
            authStatus: 'ERROR',
        })
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuthAuthorized,
                setAuthUnauthorized,
                setAuthError,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
