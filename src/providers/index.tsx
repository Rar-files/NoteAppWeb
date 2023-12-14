import ContextsProvider from './contexts'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ContextsProvider>{children}</ContextsProvider>
}

export default Providers
