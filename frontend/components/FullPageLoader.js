import React from 'react'
import ScaleLoader from "react-spinners/ScaleLoader";

const styles = {
  container: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

const FullPageLoader = () => (
  <div style={styles.container}>
    <ScaleLoader />
  </div>
)

export default FullPageLoader
