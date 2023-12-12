import { FC } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import type { AppProps } from 'next/app'
import { wrapper } from '@/app/store'

const App: FC<AppProps> = ({ Component, pageProps }) => {
    const { store } = wrapper.useWrappedStore(pageProps)

    return (
        <ReduxProvider store={store}>
            <Component {...pageProps} />
        </ReduxProvider>
    )
}

export default App
