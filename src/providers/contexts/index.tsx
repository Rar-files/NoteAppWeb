import UserProvider from './userContextProvider'

const ContextsProvider = ({ children }: { children: React.ReactNode }) => {
    return <UserProvider>{children}</UserProvider>
}

export default ContextsProvider
