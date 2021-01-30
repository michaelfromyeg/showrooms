import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { withAuthUser } from 'next-firebase-auth'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Votes from './Votes'
import Thumbnail from './Thumbnail'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const SetupsTable = ({ data, handleHideRow }) => {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Vote</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Author</TableCell>
            <TableCell align="left">View</TableCell>
            <TableCell align="left">Thumbnail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow key={row.title}>
                <TableCell align="left">
                  <Votes index={index} number={5} />
                </TableCell>
                <TableCell align="left">{row.title}</TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">by <Link href={`/user/${row.author}`}><a>{row.author}</a></Link></TableCell>
                <TableCell align="left"><a href="" onClick={(e) => { e.preventDefault(); handleHideRow(row.title) }}>{row.view}</a></TableCell>
                <TableCell align="left"><Thumbnail /></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer >
  )
}

SetupsTable.propTypes = {
  data: PropTypes.any,
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(SetupsTable)
