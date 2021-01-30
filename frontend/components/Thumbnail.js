import React from 'react'
// import PropTypes from 'prop-types'
import { withAuthUser } from 'next-firebase-auth'
import LinkIcon from '@material-ui/icons/Link'
import styles from './Thumbnail.module.scss'

const Thumbnail = () => {
  return (
    <div className={styles.thumb}>
      <LinkIcon className={styles.icon} />
      <img className={styles.img} src="https://via.placeholder.com/100x75" />
    </div>
  )
}

Thumbnail.propTypes = {}

export default withAuthUser({})(Thumbnail)
