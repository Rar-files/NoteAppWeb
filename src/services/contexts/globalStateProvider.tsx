import UserProvider from './user/userProvider'
import AuthProvider from './auth/authProvider'

const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <AuthProvider>
            <UserProvider>{children}</UserProvider>
        </AuthProvider>
    )
}

export default GlobalStateProvider
