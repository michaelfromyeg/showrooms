import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import Layout from '../../layout/layout'
import * as PhotoSphereViewer from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'
import MarkersPlugin from 'photo-sphere-viewer/dist/plugins/markers'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const axios = require('axios')

import Typography from '@material-ui/core/Typography'
import Product from '../../components/Product'
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
  const [open, setOpen] = useState(false)
  const [sku, setSku] = useState(0)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

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
    const spherePlayerInstance = new PhotoSphereViewer.Viewer({
      plugins: [
        [
          MarkersPlugin,
          {
            markers:
              setup.products.length >= 2
                ? setup.products[1].map((data, i) => {
                    console.log(data)
                    return {
                      id: `${i}`,
                      circle: 20,
                      x: data.location[0],
                      y: data.location[1],
                      tooltip: data.description,
                      data: { sku: data.sku, generated: true },
                    }
                  })
                : [],
          },
        ],
      ],
      container: sphereElementRef.current,
      panorama: `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`,
    })

    let markersPlugin = spherePlayerInstance.getPlugin(MarkersPlugin)

    markersPlugin.on('select-marker', function (e, marker, data) {
      if (marker.data && marker.data.generated) {
        if (data.dblclick) {
          // console.log(marker)
          // setOpen(true)
          // setX(marker.config.latitude)
          // setY(marker.config.longitude)
        } else if (data.rightclick) {
          // markersPlugin.removeMarker(marker)
        } else {
          // left click
          setSku(marker.data.sku)
          setOpen(true)
          console.log(marker)
        }
      }
    })

    // unmount component instructions
    return () => {
      spherePlayerInstance.destroy()
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
            <Typography
              style={{ paddingBottom: 20 }}
              className={classes.label}
              variant="h2"
            >
              {setup ? `"${setup.title}"` : null}
            </Typography>
            {setup?.img ? (
              <>
                <div style={{ width: '100%', height: 600 }} ref={sphereElementRef} />
                <Typography
                  style={{ paddingTop: 20 }}
                  className={classes.label}
                  variant="body2"
                >
                  Setup from{' '}
                  <Link href={`/user/${emailToUsername(setup.by)}`}>
                    <a>{setup ? '@' + emailToUsername(setup.by) : '...'}</a>
                  </Link>
                </Typography>
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
          <Typography
            style={{ paddingBottom: 20 }}
            className={classes.label}
            variant="h3"
          >
            Best Buy Products
          </Typography>
          <Grid container justify="space-around">
            {setup && setup.products.length >= 2
              ? setup.products[1].map((setup, i) => (
                  <ProductCard key={i} productSku={setup.sku} isUser={true} />
                ))
              : 'Waiting for products to be added'}
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Product Information</DialogTitle>
        <DialogContent>
          <Product productSku={sku} />
        </DialogContent>
      </Dialog>
    </Layout>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
