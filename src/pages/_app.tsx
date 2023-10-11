import Header from '@/Components/Header'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import store from '../redux/store'
import { Provider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'

import { CookiesProvider, useCookies } from 'react-cookie'
import ProtectedRoute from '@/Components/ProtectedRoute'

export default function App({ Component, pageProps }: AppProps) {
  
  return  <CookiesProvider>
  <SessionProvider session={pageProps.session}>
  <Provider store={store}>
    <ProtectedRoute>
      <Header/>
      
      <Component {...pageProps} />
      </ProtectedRoute>
  </Provider>
  </SessionProvider>
  </CookiesProvider>
}
