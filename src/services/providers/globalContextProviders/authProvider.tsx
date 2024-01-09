import { IAuthState, getEmptyAuthState } from '@/interfaces/IAuthState'
import { useState } from 'react'
import { AuthContext } from '@/services/contexts/authContext'
import { GetAuthReducer } from '@/services/reducers/authReducer'

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    //State
    const [auth, setAuth] = useState<IAuthState>(getEmptyAuthState())

    return (
        <AuthContext.Provider value={GetAuthReducer({ auth, setAuth })}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
