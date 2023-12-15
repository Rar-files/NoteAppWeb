import { IUser } from '@/interfaces/IUser'
import { createContext, useContext, useState } from 'react'
import { AuthContext } from './authContextProvider'
import useApiRequest from '@/hooks/useApiRequest'

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
    const { auth } = useContext(AuthContext)
    const request = useApiRequest()

    const clearUser = () => {
        setUser(getEmptyUser())
    }

    if (auth.authStatus == 'AUTHORIZED' && user.id == 0) {
        request('GET', '/user/me')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(response.status + ' ' + response.statusText)
                }

                response
                    .json()
                    .then((data) => {
                        setUser(data)
                    })
                    .catch((error: Error) => {
                        throw error
                    })
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
