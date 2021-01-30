import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

import { Container } from '@material-ui/core'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useAuthUser } from 'next-firebase-auth'
import axios from 'axios'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, title }) => {
  const AuthUser = useAuthUser()

  // useEffect(() => {
  //   var formData = new FormData()
  //   formData.append('email', AuthUser.email)
  //   formData.append('user_name', AuthUser.name)
  //   console.log(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`)
  //    axios.post(
  //     `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
  //     formData,
  //     { headers: { 'Content-Type': 'multipart/form-data' } }
  //   )
  // }, [])

  return (
    <>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Container style={{ paddingTop: 10 }} maxWidth="lg">
        <Head>
          <title>{title}</title>
        </Head>
        {children}
        <Footer />
      </Container>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
}

export default Layout
