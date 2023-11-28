import { FC } from 'react'
import type { AppProps } from 'next/app'
import { wrapper } from '@/app/store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App)
