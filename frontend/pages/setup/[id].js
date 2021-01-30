import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../../layout/layout'
import { Viewer } from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'
const axios = require('axios');

import Typography from '@material-ui/core/Typography'
import ProductCard from '../../components/ProductCard'

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

const Setups = () => {
  const classes = useStyles()
  const router = useRouter()
  const { id } = router.query
  const [setup, setSetup] = useState()

  useEffect(() => {
    if (id)
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/setup/' + id)
        .then((response) => response.json())
        .then((data) => setSetup(data))
  }, [id])

  console.log(setup)

  const sphereElementRef = React.createRef()

  useEffect(() => {
    if (!setup) return
    const shperePlayerInstance = new Viewer({
      container: sphereElementRef.current,
      panorama: `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`,
    })

    // unmount component instructions
    return () => {
      shperePlayerInstance.destroy()
    }
  }, [setup])

  const emailToUsername = (email) => {
    if (!email) return
    return email.split('@')[0]
  }

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Layout title={'Setup'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography style={{ paddingBottom: 20 }} className={classes.label} variant="h2">{setup ? `"${setup.title}"` : null}</Typography>
            {setup?.img ? (
              <>
                <div style={{ width: '100%', height: 600 }} ref={sphereElementRef} />
                <Typography style={{ paddingTop: 20 }} className={classes.label} variant="body2">Setup from <Link href={`/user/${emailToUsername(setup.by)}`}><a>{setup ? '@' + emailToUsername(setup.by) : '...'}</a></Link></Typography>
              </>
            ) : (
                <>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="rect" height={600} />
                </>
              )}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography style={{ paddingBottom: 20 }} className={classes.label} variant="h3">Best Buy Products</Typography>
          <Grid container justify="space-around">
            {Array.from(Array(5)).map((i) => {
              return <ProductCard key={i} productSku={12909349} />
            })}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
