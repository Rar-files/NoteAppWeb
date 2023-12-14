import { IUser } from '@/interfaces/IUser'
import { createContext, useState } from 'react'

const getEmptyUser = (): IUser => {
    return {
        id: 0,
        email: '',
        firstName: '',
        lastName: '',
    }
}

export const UserContext = createContext({
    user: getEmptyUser(),
    setUser: (user: IUser) => {
        user
    },
    clearUser: () => {},
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<IUser>(getEmptyUser())

    const clearUser = () => {
        setUser(getEmptyUser())
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
