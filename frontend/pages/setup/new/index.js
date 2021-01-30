import React, { useState } from 'react'
import { withAuthUser } from 'next-firebase-auth'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Layout from '../../../layout/layout'
import { makeStyles } from '@material-ui/core/styles'
import { DropzoneArea } from 'material-ui-dropzone'
import { Button, TextField } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import axios from 'axios'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Setups = () => {
  const classes = useStyles()
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState()

  const router = useRouter()

  const handleChange = (val) => {
    if (val) setFile(val[0])
  }

  const submit = async () => {
    if (!file || !title) return

    var formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('description', description)
    formData.append('tags', tags)

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/setup`,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    if (data._id) router.push(`/setup/${data._id}`)
  }

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Layout title={'Add new Setup'}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              label="Showroom Title"
              fullWidth
            />
            <br />
            <br />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              label="Description"
              placeholder="Enter a description of your showroom"
              fullWidth
            />
            <br />
            <br />
            <ChipInput
              label="Tags"
              defaultValue={tags}
              onChange={(chips) => setTags(chips)}
              fullWidth
            />
            <br />
            <br />
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText="Drag and drop an image of your showroom here"
              filesLimit={1}
              onChange={handleChange}
            />
            <Button onClick={submit} variant="contained" color="primary" style={{ paddingTop: 5 }}>
              Submit
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Setups)
