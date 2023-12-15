import ContextsProvider from './contexts'
import { CookiesProvider } from 'next-client-cookies/server'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <ContextsProvider>{children}</ContextsProvider>
        </CookiesProvider>
    )
}

export default Providers
