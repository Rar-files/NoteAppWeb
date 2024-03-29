import {
    setCookie as setNextCookie,
    getCookie as getNextCookie,
} from 'cookies-next'
import { decrypt, encrypt } from 'crypto-js/aes'
import { enc } from 'crypto-js/'

const useEncryptedCookie = <T>(key: string) => {
    const cookieSecret = process.env.NEXT_PUBLIC_COOKIE_SECRET

    if (!cookieSecret)
        throw new Error('NEXT_PUBLIC_COOKIE_SECRET is not defined')

    const setCookie = (data: T) => {
        const encryptedCookieData = encrypt(
            JSON.stringify(data),
            cookieSecret
        ).toString()

        setNextCookie(key, encryptedCookieData, {
            secure: true,
            sameSite: 'strict',
        })
    }

    const getCookie = (): T | null => {
        const encryptedCookieData = getNextCookie(key)

        if (!encryptedCookieData) return null

        const cookieData = decrypt(encryptedCookieData, cookieSecret).toString(
            enc.Utf8
        )

        if (!cookieData) return null

        return JSON.parse(cookieData) as T
    }

    return { setCookie, getCookie }
}

export { useEncryptedCookie }
