import React from 'react'
import styles from '../../styles'

function IconButton(props) {

  const {
    icon,
    onClick,
    style,
  } = props;

  return(
    <div 
      style={{...styles.icon, ...style}}
      onClick={onClick}
    >
      <i className={`fa fa-${icon}`} />
    </div>
  )
}

IconButton.defaultProps = {
  style: {}
}

export default IconButton