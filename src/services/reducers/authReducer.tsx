import { useEncryptedCookie } from '@/hooks/useEncryptedCookie'
import { useJWTHelpers } from '@/hooks/useJWTHelpers'
import { IAuthData } from '@/interfaces/IAuthData'
import { IAuthState, getEmptyAuthState } from '@/interfaces/IAuthState'
import { Dispatch, SetStateAction } from 'react'

const GetAuthReducer = ({
    auth,
    setAuth,
}: {
    auth: IAuthState
    setAuth: Dispatch<SetStateAction<IAuthState>>
}) => {
    //Use encrypted cookie for store auth data
    const { setCookie, getCookie } = useEncryptedCookie<IAuthData>('auth-data')
    const { tokenToExpDate } = useJWTHelpers()

    //Try get authdata from cookie after initial component
    const tryGetAuthStateFromCookie = (): IAuthState | null => {
        const authDataCookie = getCookie()

        if (!authDataCookie) return null

        if (new Date(authDataCookie.expTime) < new Date()) return null

        return {
            authStatus: 'AUTHORIZED',
            authData: authDataCookie,
        }
    }

    if (auth.authStatus == 'UNAUTHORIZED') {
        const authDataFromCookie = tryGetAuthStateFromCookie()
        if (authDataFromCookie) setAuth(authDataFromCookie)
    }

    //Set AuthState to cookie and global state
    const setAuthStateWithCookie = (authState: IAuthState) => {
        setAuth(authState)
        setCookie(authState.authData)
    }

    //Reducer actions:
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

    return {
        auth,
        setAuthAuthorized,
        setAuthUnauthorized,
        setAuthError,
    }
}

export { GetAuthReducer }
