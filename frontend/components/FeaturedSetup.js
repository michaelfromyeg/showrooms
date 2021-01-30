import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { Viewer } from 'photo-sphere-viewer'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'

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

const FeaturedSetup = () => {
  const classes = useStyles()
  const router = useRouter()
  const id = "6015ba03f7cf6d6ad6cd0f17"
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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography style={{ paddingBottom: 20 }} className={classes.label} variant="h2">{`"My New Battlestation"`}</Typography>
          {setup?.img ? (
            <div style={{ width: '100%', height: 600 }} ref={sphereElementRef} />
          ) : (
              <>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="rect" height={400} />
              </>
            )}
          <Typography style={{ paddingTop: 20 }} className={classes.label} variant="body2">Featured Setup—from <a>@liangliu</a></Typography>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default FeaturedSetup
