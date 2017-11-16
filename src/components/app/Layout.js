import React from 'react'
import styles from '../../styles'

const Layout = (props) => (
  <div
  style={{
    ...styles.container,
    ...props.gradient,
    ...props.style,
  }}
  >
    {props.children}
  </div>
)

Layout.defaultProps = {
  gradient: {
    backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)'
  },
  style: {}
}

export default Layout