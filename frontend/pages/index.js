import React, { useState, useEffect } from 'react'
import { useAuthUser, withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { makeStyles } from '@material-ui/core/styles'
import SetupsTable from '../components/SetupsTable'
import Container from '@material-ui/core/Container'
import Layout from '../layout/layout'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    padding: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}))

const createData = (title, date, author, view) => {
  return { title, date, author, view }
}

const rows = [
  createData('Title', 'Today', 'michaelfromyeg', 'hide'),
  createData('Title', 'Today', 'hasanaltaf', 'hide'),
  createData('Title', 'Today', 'stuffybyliang', 'hide'),
  createData('Title', 'Today', 'projectsbyjackhe', 'hide'),
]

const Index = () => {
  const [data, setData] = useState(null)
  const AuthUser = useAuthUser()
  const classes = useStyles()

  useEffect(() => {
    const fetchSetups = async () => {
      try {
        const result = await fetch('http://localhost:3001/setup')
        const resultJson = await result.json()
        setData(resultJson.data)
      } catch (e) {
        console.error(e)
        setData(rows)
      }
    }
    fetchSetups()
  }, [])

  return (
    <Layout title={'Home'}>
      <div className={classes.root}>
        <Header email={AuthUser.email} signOut={AuthUser.signOut} />
        <Container className={classes.container} maxWidth={'md'}>
          <SetupsTable data={data} />
          <Footer />
        </Container>
      </div>
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Index)
