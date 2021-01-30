import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

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
        <Typography variant="body2">Signed in as {email}</Typography>
        <Button color="inherit"
          onClick={() => {
            signOut()
          }}
        >
          Sign out
        </Button>
      </>
    ) : (
      <>
        <Typography variant="body2">You are not signed in.</Typography>
        <Link href="/auth">
          <a>
            <Button color="inherit">
              Sign in
            </Button>
          </a>
        </Link>
      </>
    )}
    </Toolbar>
  </AppBar>
  )
}

export default Header