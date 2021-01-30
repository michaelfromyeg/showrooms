import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import { Container } from '@material-ui/core'
import Header from '../components/Header'
import { useAuthUser } from 'next-firebase-auth'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title }) => {
  const AuthUser = useAuthUser()

  return (
    <>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Container style={{ paddingTop: 10 }} maxWidth="lg">
        <Head>
          <title>{title}</title>
        </Head>
        {children}
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
