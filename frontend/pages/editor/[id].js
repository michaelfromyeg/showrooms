import React from 'react'
import Layout from '../../layout/layout'
import { makeStyles } from '@material-ui/core/styles'
import Editor from '../../components/Editor'
import { withAuthUser } from 'next-firebase-auth'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const Edit = () => {
  const classes = useStyles()

  // eslint-disable-next-line react/jsx-no-undef
  return (
    <Layout title={'View All Setup'}>
      <Editor />
    </Layout>
  )
}

export default withAuthUser({})(Edit)
