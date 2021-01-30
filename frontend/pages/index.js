import React from 'react'
import Head from 'next/head'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Index = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={classes.root}>
        <Header email={AuthUser.email} signOut={AuthUser.signOut} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Index)
