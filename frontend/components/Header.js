import React from 'react'
import { useAuthUser } from 'next-firebase-auth'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
}))

const Header = ({ email, signOut }) => {
  const AuthUser = useAuthUser()
  const classes = useStyles()
  const emailToUsername = (email) => {
    return email.split('@')[0]
  }

  // console.log(AuthUser)

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href={`/`}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <ShoppingCartIcon />
          </IconButton>
        </Link>
        <Typography variant="h6" className={classes.title}>
          Showrooms by Best Buy
        </Typography>
        {email ? (
          <>
            <Typography style={{ marginleft: 10, marginRight: 10, padding: 0, }} variant="body2">Hi, {emailToUsername(email)}!</Typography>
            <Link href={`/setup/new`}>
              <IconButton color="inherit">
                <AddCircleIcon />
              </IconButton>
            </Link>
            <Link href={`/user/${emailToUsername(email)}`}>
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </Link>
            <Button
              color="inherit"
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
                  <Button color="inherit">Sign in</Button>
                </a>
              </Link>
            </>
          )}
      </Toolbar>
    </AppBar>
  )
}

Header.propTypes = {
  email: PropTypes.any,
  signOut: PropTypes.any,
}

export default Header
