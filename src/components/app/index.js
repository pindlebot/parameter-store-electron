import React from 'react'
import Layout from './Layout'
import App from './App'
import styles from '../../styles'

function Input(props) {
  const {
    value,
    onChange,
    placeholder
  } = props

  return(
    <input 
    value={value}
    placeholder={placeholder} 
    onChange={onChange}
    style={{
      ...styles.input, 
      width: 'auto',
      marginRight: 0,
      marginBottom: '20px',
      height: '30px'
    }}
    />
  )
}

class Index extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      config: {
        accessKeyId: '',
        secretKey: '',
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e, name) {
    const { config } = this.state;
    config[name] = e.target.value
  
    this.setState({
      config
    })
  }

  render() {
    const { config } = this.state;

    if(this.props.getState().config.hasOwnProperty('error')) {
      return (
        <Layout>
          <div></div>
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            padding: '20px'
          }}>
            <Input 
              value={config.accessKeyId} 
              placeholder={'AWS access key ID'} 
              onChange={e => this.onChange(e, 'accessKeyId')}  
            />
            <Input 
              value={config.secretKey} 
              placeholder={'AWS secret key'} 
              onChange={e => this.onChange(e, 'secretKey')}
            />
          </div>
          <div></div>
        </Layout>
      )
    }
    
    return(<App {...this.props} />)
  }
}

export default Index;