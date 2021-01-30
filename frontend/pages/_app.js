import { ThemeProvider } from '@material-ui/core'
import React, { useEffect } from 'react'
import '../styles/globals.css'
import initAuth from '../utils/initAuth'
import theme from '../utils/theme'

initAuth()

const MyApp = ({ Component, pageProps }) => {

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp