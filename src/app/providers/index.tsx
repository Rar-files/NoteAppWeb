import { GlobalContextProvider } from '@/app/providers/globalContextProvider'
import { CookiesProvider } from 'next-client-cookies/server'
// import { ThemeProvider as NextThemesProvider } from 'next-themes'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <CookiesProvider>
            {/*use client:*/}
            <GlobalContextProvider>
                {/* <NextThemesProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                > */}
                {children}
                {/* </NextThemesProvider> */}
            </GlobalContextProvider>
        </CookiesProvider>
    )
}

export { Providers }
