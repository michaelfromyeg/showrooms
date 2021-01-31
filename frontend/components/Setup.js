import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Viewer } from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import ProductCard from './ProductCard'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  label: {
    // paddingTop: theme.spacing(3),
    textAlign: 'left',
    color: theme.palette.text.primary,
  },
}))

const Setups = ({ id }) => {
  const classes = useStyles()
  const [setup, setSetup] = useState()

  console.log(id)
  console.log(setup)

  useEffect(() => {
    if (id)
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/setup/user/' + id)
        .then((response) => response.json())
        .then((data) => setSetup(data))
  }, [id])

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Grid item xs={12}>
      <h2>View their setup</h2>
      {setup && setup.products.length >= 2
        ? setup.products[1].map((setup, i) => (
          <ProductCard key={i} productSku={setup.sku} isUser={true} />
        ))
        : 'Waiting for products to be added'}
    </Grid>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
