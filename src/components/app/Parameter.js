import React from 'react'
import styles from '../../styles'
import IconButton from './IconButton'

function splitParam(param) {
  let params = param.split('/')

  return {
    namespace: params.slice(0, params.length - 1).join('/'),
    name: params.slice(params.length - 1) || ''
  }
}

function Parameter (props) {
  const {
    param,
    hover,
    deleteParam,
    revealParam,
    revealed,
    onMouseEnter,
    onMouseOut,
  } = props;

  return (
    <div style={styles.parameterWrapper} key={`div1_${param.id}`}>
      <div
        key={`div2_${param.id}`}
        style={{
          ...styles.parameter,
        }}        
        >
        {!param.value ? 
          <div 
            onClick={props.onClick}  
            onMouseEnter={onMouseEnter}
            onMouseOut={onMouseOut} 
            key={`div3_${param.id}`}
            style={{
              flexBasis: '85%', 
              textAlign: 'left',
              color: props.hover === param.id ? '#0366d6' : '#666',
              display: 'flex',
              flexDirection: 'row',
            }}>
            <div>{splitParam(param.key).name}</div>
            <div style={{color: '#999'}}>{splitParam(param.key).namespace}</div>
          </div> : <div 
          key={`div4_${param.id}`}
          style={{
            flexBasis: '85%', 
            textAlign: 'left',
            color: 'rgba(39,174,96,1)',
          }}>
          
          <input 
            style={{
              border: 0,
              outline: 0,
              padding: 0,
              margin: 0,
              color: 'inherit',
              backgroundColor: 'transparent',
              width: '100%',
              fontFamily: 'inherit',
              fontSize: 'inherit'
            }}
            value={param.value || ''} 
            readOnly
          />
        </div>}
        
        <IconButton onClick={() => revealParam(param)} icon={
          param.value ? 'eye-slash' : 'eye'
        } />
        <span style={{width: '10px'}}></span>
        <IconButton onClick={() => deleteParam(param)} icon="trash" />
      </div>

  </div>
  )
}

export default Parameter