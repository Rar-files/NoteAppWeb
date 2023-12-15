import { IAuthData } from './IAuthData'

export interface IAuthState {
    authStatus: 'AUTHORIZED' | 'ERROR' | 'UNAUTHORIZED'
    authData: IAuthData
}
