import React, { useEffect, useState } from 'react'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../../layout/layout'
import { Viewer } from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'
const axios = require('axios');


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
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

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Layout title={'Setup'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {setup?.img ? (
              <div style={{ width: '100%', height: 400 }} ref={sphereElementRef} />
            ) : (
                <>
                  <Skeleton variant="text" height={40} />
                  <Skeleton variant="rect" height={400} />
                </>
              )}
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
