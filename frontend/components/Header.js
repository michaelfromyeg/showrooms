import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ email, signOut }) => {
  const classes = useStyles();

  return (
  <AppBar position="static">
    <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" className={classes.title}>
      Setups by Best Buy
    </Typography>
    {email ? (
      <>
        <p>Signed in as {email}</p>
        <button
          type="button"
          onClick={() => {
            signOut()
          }}
        >
          Sign out
        </button>
      </>
    ) : (
      <>
        <p>You are not signed in.</p>
        <Link href="/auth">
          <a>
            <button type="button">
              Sign in
            </button>
          </a>
        </Link>
      </>
    )}
    </Toolbar>
  </AppBar>
  )
}

export default Header