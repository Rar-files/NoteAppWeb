'use client'

import { IAuthData } from '@/interfaces/IAuthData'
import { IAuthState, getEmptyAuthState } from '@/interfaces/IAuthState'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import { AuthContext } from './authContext'
import useEncryptedCookie from '@/hooks/useEncryptedCookie'

const tokenToExpDate = (token: string) => {
    const jwtdecoded = jwtDecode(token)
    const expDate = new Date()
    expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
    return expDate.toISOString()
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //Cookie logic
    const { setCookie, getCookie } = useEncryptedCookie<IAuthData>('auth-data')

    const tryGetAuthStateFromCookie = (): IAuthState => {
        const authDataCookie = getCookie()

        if (!authDataCookie) return getEmptyAuthState()

        if (new Date(authDataCookie.expTime) < new Date())
            return getEmptyAuthState()

        return {
            authStatus: 'AUTHORIZED',
            authData: authDataCookie,
        }
    }

    //State
    const [auth, setAuth] = useState<IAuthState>(tryGetAuthStateFromCookie())

    const setAuthStateWithCookie = (authState: IAuthState) => {
        setAuth(authState)
        setCookie(authState.authData)
    }

    //Actions:
    const setAuthAuthorized = (token: string) => {
        setAuthStateWithCookie({
            authStatus: 'AUTHORIZED',
            authData: {
                token: token,
                expTime: tokenToExpDate(token),
            },
        })
    }

    const setAuthUnauthorized = () => {
        setAuthStateWithCookie(getEmptyAuthState())
    }

    const setAuthError = () => {
        setAuthStateWithCookie({
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
