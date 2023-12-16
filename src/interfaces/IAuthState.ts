import { IAuthData } from './IAuthData'

export interface IAuthState {
    authStatus: 'AUTHORIZED' | 'ERROR' | 'UNAUTHORIZED'
    authData: IAuthData
}

export const getEmptyAuthState = (): IAuthState => {
    return {
        authStatus: 'UNAUTHORIZED',
        authData: {
            token: '',
            expTime: new Date().toISOString(),
        },
    }
}
