import React from 'react'
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Footer from '../components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Layout from '../layout/layout'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Index = () => {
  const classes = useStyles()

  return (
    <Layout title={'Home'}>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>xs=12</Paper>
          </Grid>
        </Grid>
        <Footer />
      </div>
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Index)
