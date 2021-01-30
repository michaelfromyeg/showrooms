import React from 'react'
import PropTypes from 'prop-types'
import { withAuthUser } from 'next-firebase-auth'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'

const Votes = ({ index, number }) => {
  return (
    <Container
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        padding: 0,
      }}
    >
      {/* index */}
      {/*`. `*/}
      <Typography alignCenter variant="body1">
        {number}
      </Typography>
      <ExpandLessIcon />
    </Container>
  )
}

Votes.propTypes = {
  index: PropTypes.any,
  number: PropTypes.any,
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Votes)
