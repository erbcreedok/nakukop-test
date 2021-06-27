import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { AppContext, State, store } from '@/store'
import isBrowser from '@/utils/isBrowser'
import getRandomDollarRate from '@/utils/getRandomDollarRate'
import fetchAllData from '@/fetchers/fetchAllData'
import setAsyncInterval from '@/utils/setAsyncInterval'

interface IAppProviderProps {
  children: React.ReactNode
  storeState: State
}

const AppProvider = ({ children, storeState }: IAppProviderProps): JSX.Element => {
  if (storeState && !isBrowser()) {
    store.dispatch('set', storeState)
  }

  useEffect(() => {
    if (storeState) {
      store.dispatch('set', storeState)
    }
  }, [storeState])

  useEffect(() => {
    const dollarUpdateInterval = setInterval(() => {
      store.dispatch('dollarRate/set', getRandomDollarRate())
    }, 20000)
    const clearFetchInterval = setAsyncInterval(async () => {
      const data = await fetchAllData()
      store.dispatch('set', data)
    }, 15000)
    return () => {
      clearInterval(dollarUpdateInterval)
      clearFetchInterval()
    }
  }, [])

  return (
    <AppContext.Provider value={store}>
      <ChakraProvider>
        <div>{children}</div>
      </ChakraProvider>
    </AppContext.Provider>
  )
}

export default AppProvider
