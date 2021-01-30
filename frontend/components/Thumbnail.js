import React from 'react'
// import PropTypes from 'prop-types'
import { withAuthUser } from 'next-firebase-auth'

const Thumbnail = () => {
  return (
    <img src="https://via.placeholder.com/75x50" />
  )
}

Thumbnail.propTypes = {}

export default withAuthUser({})(Thumbnail)
