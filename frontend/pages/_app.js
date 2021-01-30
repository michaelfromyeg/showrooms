import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from '@material-ui/core'
import initAuth from '../utils/initAuth'
import theme from '../utils/theme'
import { ToastContainer } from 'react-toastify'
import CssBaseline from '@material-ui/core/CssBaseline'

initAuth()

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
}

export default App
