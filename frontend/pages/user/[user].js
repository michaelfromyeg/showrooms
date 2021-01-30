import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { withAuthUser } from 'next-firebase-auth'
import Header from '../../components/Header'
import { useAuthUser } from 'next-firebase-auth'
import { useRouter } from 'next/router'
import UserProfile from '../../components/UserProfile'
import Grid from '@material-ui/core/Grid';

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

  return (
    <>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Grid container justify="center" className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <h3>User: {user}</h3>
        </Grid>
        <Grid item xs={12}>
          {AuthUser.id === user &&
            <>
              <h3>This is your page.</h3>
              <UserProfile user={AuthUser} />
            </>
          }
        </Grid>
      </Grid>
    </>
  )
}

export default withAuthUser({})(User)
