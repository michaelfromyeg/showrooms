import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
  AuthAction
} from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'
import Header from '../components/Header'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { toast } from 'react-toastify'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const Auth = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles();

  const notify = () => toast("Wow so easy!");

  return (
    <div className={classes.root}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            Sign in
          </Paper>
        </Grid>
      </Grid>
      <FirebaseAuth />
    </div>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)