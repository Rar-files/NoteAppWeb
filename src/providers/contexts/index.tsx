import UserProvider from './userContextProvider'
import AuthProvider from './authContextProvider'

const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}

export default ContextsProvider
