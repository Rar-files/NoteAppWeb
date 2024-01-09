import { GlobalContextProvider } from './globalContextProviders'
import { NextThemesProvider } from './nextThemesProvider'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <GlobalContextProvider>
            <NextThemesProvider>{children}</NextThemesProvider>
        </GlobalContextProvider>
    )
}

export { Providers }
