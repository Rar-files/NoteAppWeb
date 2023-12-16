export interface IUser {
    id: number
    email: string
    firstName: string
    lastName: string
}

export const getEmptyUser = (): IUser => {
    return {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
    }
}
