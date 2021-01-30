import React from 'react'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Layout from '../layout/layout'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Setups = () => {
  const classes = useStyles()

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Layout title={'View All Setup'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Fuck me</Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
