import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppProvider from '@/provider/AppProvider'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const { storeState } = pageProps
  return (
    <AppProvider storeState={storeState}>
      <Component {...pageProps} />
    </AppProvider>
  )
}
export default MyApp
