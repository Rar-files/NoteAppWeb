'use client'

import { IUser, getEmptyUser } from '@/interfaces/IUser'
import { useState } from 'react'
import useApiRequest from '@/hooks/useApiRequest'
import { useAuthState } from '@/hooks/useGlobalState'
import { UserContext } from './userContext'

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    //State
    const [user, setUser] = useState<IUser>(getEmptyUser())

    //Addicional actions
    const clearUser = () => {
        setUser(getEmptyUser())
    }

    //Addicional logic
    const { auth } = useAuthState()
    const request = useApiRequest()

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

    //Context provider
    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
