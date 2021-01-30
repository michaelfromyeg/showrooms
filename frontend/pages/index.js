import React, { useState, useEffect } from 'react'
import { withAuthUser, withAuthUserTokenSSR } from 'next-firebase-auth'
import SetupsTable from '../components/SetupsTable'
import SetupsForm from '../components/SetupsForm'
import Layout from '../layout/layout'

const createData = (title, date, author, view) => {
  return { title, date, author, view }
}

const rows = [
  createData('Title 1', 'Today', 'michaelfromyeg', 'hide'),
  createData('Title 2', 'Today', 'hasanaltaf', 'hide'),
  createData('Title 3', 'Today', 'stuffybyliang', 'hide'),
  createData('Title 4', 'Today', 'projectsbyjackhe', 'hide'),
]

const Index = () => {
  const [data, setData] = useState(null)

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

  const handleHideRow = (title) => {
    setData(data.filter(row => row.title !== title))
  }

  return (
    <Layout title={'Home'}>
      <SetupsForm />
      <SetupsTable data={data} handleHideRow={handleHideRow} />
    </Layout>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Index)
