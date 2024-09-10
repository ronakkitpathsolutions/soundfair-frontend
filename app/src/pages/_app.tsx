import React from 'react'
import '@ui/styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@/features/common/store'
import { Marker } from '@/components/Marker'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ToastLayout } from '../features/common/layouts/ToastLayout'

export default function App({ Component, pageProps }: any) {
  return (
    <>
      {/* <Analytics gtmId="GTM-KH8GTWHH" /> */}
      <GoogleAnalytics gaId="G-Z0RKVMP5C1" />
      <Marker projectId="64f7b4007e25427fcde10eb7" />
      <Provider store={store}>
        {/*  @ts-ignore - Due to react-persist not being updated for React 18 */}
        <PersistGate loading={null} persistor={persistor}>
          {/* <TransitionFade> */}
          <Component {...pageProps} />
          <ToastLayout />
          {/* </TransitionFade> */}
        </PersistGate>
      </Provider>
    </>
  )
}
