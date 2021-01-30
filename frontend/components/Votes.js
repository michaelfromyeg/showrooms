import React from 'react'
import PropTypes from 'prop-types'
import { withAuthUser } from 'next-firebase-auth'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { Typography } from '@material-ui/core'
import { Container } from '@material-ui/core'

const Votes = ({ handleVote, hasClicked, index, number }) => {
  const alreadyClicked = (e) => {
    e.preventDefault()
    return false;
  }
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
      <Typography style={hasClicked ? { color: '#0A4ABF' } : null} alignCenter variant="body1">
        {number}
      </Typography>
      <a
        href=""
        style={hasClicked ? { pointerEvents: 'none' } : null}
        onClick={(e) => hasClicked ? alreadyClicked(e) : handleVote(e, index)}
      >
        <ExpandLessIcon style={hasClicked ? { color: '#0A4ABF' } : null} />
      </a>
    </Container >
  )
}

Votes.propTypes = {
  handleVote: PropTypes.any,
  hasClicked: PropTypes.any,
  index: PropTypes.any,
  number: PropTypes.any,
}

export default withAuthUser({
  // whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Votes)
