import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withAuthUser } from 'next-firebase-auth'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import UserProfile from '../../components/UserProfile'
import Grid from '@material-ui/core/Grid'
import Layout from '../../layout/layout'
import ProductCard from '../../components/ProductCard'

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

const User = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles()
  const router = useRouter()
  const { user } = router.query

  const emailToUsername = (email) => {
    return email.split('@')[0]
  }


  return (
    <Layout title={'Profile'}>
      <Grid container justify="center" className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <h1>Welcome back, {AuthUser.email ? emailToUsername(AuthUser.email) + '!' : '...'}</h1>
          <p>Here is your profile page. Feel free to update your setup or add a new build.</p>
        </Grid>
        <Grid item xs={12}>
          {AuthUser.id === user && (
            <UserProfile user={AuthUser} />
          )}
        </Grid>
        <Grid item xs={12}>
          <h2>Edit your setup</h2>
          <ProductCard productSku={"14932190"} isUser={true} />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withAuthUser({})(User)
