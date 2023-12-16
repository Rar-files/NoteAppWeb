import GlobalStateProvider from '@/services/contexts/globalStateProvider'
import { CookiesProvider } from 'next-client-cookies/server'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            <GlobalStateProvider>{children}</GlobalStateProvider>
        </CookiesProvider>
    )
}

export default Providers
