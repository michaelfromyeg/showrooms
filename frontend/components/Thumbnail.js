import React from 'react'
import PropTypes from 'prop-types'
import { withAuthUser } from 'next-firebase-auth'
import LinkIcon from '@material-ui/icons/Link'
import styles from './Thumbnail.module.scss'
import Skeleton from '@material-ui/lab/Skeleton'

const Thumbnail = ({ id }) => {

  return (
    <div className={styles.thumb}>
      <LinkIcon className={styles.icon} />
      <img className={styles.img} src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/setup/${id}/image`} style={{ width: 100, height: 75 }} />
    </div>
  )
}

Thumbnail.propTypes = {
  id: PropTypes.any,
}

export default withAuthUser({})(Thumbnail)
