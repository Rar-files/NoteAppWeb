'use client'

import { UserProvider } from './userProvider'
import { AuthProvider } from './authProvider'

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}

export { GlobalContextProvider }
