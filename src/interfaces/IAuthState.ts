export interface IAuthState {
    authStatus: 'AUTHORIZED' | 'ERROR' | 'UNAUTHORIZED'
    token: string
    expTime: string
}
