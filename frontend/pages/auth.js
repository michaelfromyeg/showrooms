import React from "react"
import { useAuthUser, withAuthUser, AuthAction } from "next-firebase-auth"
import FirebaseAuth from "../components/FirebaseAuth"
import Header from "../components/Header"
import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}))

const Auth = () => {
  const AuthUser = useAuthUser()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Sign in</Paper>
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
