'use client'

import { IAuthData } from '@/interfaces/IAuthData'
import { IAuthState } from '@/interfaces/IAuthState'
import { jwtDecode } from 'jwt-decode'
import { createContext, useState } from 'react'
import { useCookies } from 'next-client-cookies'
import { encrypt, decrypt } from 'crypto-js/aes'
import { enc } from 'crypto-js/'

const getEmptyAuthState = (): IAuthState => {
    return {
        authStatus: 'UNAUTHORIZED',
        authData: {
            token: '',
            expTime: new Date().toISOString(),
        },
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
    const cookies = useCookies()
    const authSecret = process.env.NEXT_PUBLIC_AUTH_COOKIE_SECRET

    if (!authSecret)
        throw new Error('NEXT_PUBLIC_AUTH_COOKIE_SECRET is not defined')

    const setAuthCookie = (authData: IAuthData) => {
        const encryptedAuthCookieData = encrypt(
            JSON.stringify(authData),
            authSecret
        ).toString()

        cookies.set('auth-data', encryptedAuthCookieData, {
            secure: true,
            sameSite: 'strict',
        })
    }

    const getAuthCookie = (): IAuthData | null => {
        const encryptedAuthCookieData = cookies.get('auth-data')

        if (!encryptedAuthCookieData) return null

        const authCookieData = decrypt(
            encryptedAuthCookieData,
            authSecret
        ).toString(enc.Utf8)

        if (!authCookieData) return null

        return JSON.parse(authCookieData) as IAuthData
    }

    const tryGetAuthStateFromCookie = (): IAuthState => {
        const authDataCookie = getAuthCookie()

        if (!authDataCookie) return getEmptyAuthState()

        if (new Date(authDataCookie.expTime) < new Date())
            return getEmptyAuthState()

        return {
            authStatus: 'AUTHORIZED',
            authData: authDataCookie,
        }
    }

    const [auth, setAuth] = useState<IAuthState>(tryGetAuthStateFromCookie())

    const tokenToExpDate = (token: string) => {
        const jwtdecoded = jwtDecode(token)
        const expDate = new Date()
        expDate.setSeconds(expDate.getSeconds() + (jwtdecoded.exp as number))
        return expDate.toISOString()
    }

    const setAuthStateWithCookie = (authState: IAuthState) => {
        setAuth(authState)
        setAuthCookie(authState.authData)
    }

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
