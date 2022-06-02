import '../styles/globals.css'
import '@fontsource/roboto'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { FunctionComponent } from 'react'
import { theme } from '../theme/theme'

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
