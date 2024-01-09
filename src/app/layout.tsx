import type { Metadata } from 'next'
import { Providers } from '@/services/providers'

import '@/styles/tailwind.css'
import MenuBar from '@/components/menu-bar'

export const metadata: Metadata = {
    title: 'About',
    description: 'About page',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body
                className={`bg-bg dark:bg-bg-dark text-text dark:text-text-dark`}
            >
                <Providers>
                    <MenuBar />
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout
