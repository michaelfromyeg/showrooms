import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <>
      <p style={{ textAlign: 'center' }}>Made with ❤ by <Link href="https://github.com/stuffbyliang"><a>Liang</a></Link>, <Link href="https://github.com/michaelfromyeg"><a>Michael</a></Link>, and <Link href="https://github.com/haltaf19"><a>Hasan</a></Link> for BizHacks 2021.</p>
      <p style={{ textAlign: 'center' }}>Showroom © 2021</p>
    </>
  )
}

export default Footer
