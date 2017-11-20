import React from 'react'
import Layout from './Layout'
import App from './App'
import styles from '../../styles'
import * as actions from '../../actions'
import _ from 'lodash'
const ipc = require('electron').ipcRenderer;

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

    this.reload = this.reload.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e, name) {
    const { config: { credentials } } = this.props.getState()
    this.props.dispatch(
      actions.updateConfig({
        ...credentials,
        [name]: e.target.value
      })
    )
  }

  reload() {
    const { credentials } = this.props.getState().config
    ipc.send('reload', JSON.stringify({
      aws_access_key_id: credentials.accessKeyId,
      aws_secret_access_key: credentials.secretKey
    }))
    this.props.dispatch(
      actions.updatePathname({
        pathname: ''
      })
    )
  }

  //getPathname = () => _.get(this.props.getState(), ['path', 'pathname'])

  //getError = () => _.get(this.props.getState(), ['config', 'error']) 

  componentDidMount() {
  
  }

  render() {    
    if(
    //_.get(this.props.getState(), ['config', 'error']) || 
    _.get(this.props.getState(), ['path', 'pathname']) === 'credentials'
  ) {
      const credentials = _.get(
        this.props.getState(), 
        ['config', 'credentials'], {
          accessKeyId: '',
          secretKey: '',
        }
      )

      return (
        <Layout>
          <div></div>
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            padding: '20px'
          }}>
            <Input 
              value={credentials.accessKeyId} 
              placeholder={'AWS access key ID'} 
              onChange={e => this.onChange(e, 'accessKeyId')}  
            />
            <Input 
              value={credentials.secretKey} 
              placeholder={'AWS secret key'} 
              onChange={e => this.onChange(e, 'secretKey')}
            />
            <button style={{          
              height: '40px',
              lineHeight: '40px',
              padding: '0 14px',
              boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)',
              background: '#fff',
              borderRadius: '4px',
              fontSize: '15px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '.025em',
              color: '#6772e5',
              textDecoration: 'none',
              transition: 'all .15s ease',
              outline: 0,
              border: 0,
              cursor: 'pointer'
            }}
            
            onClick={this.reload}>Update</button>
          </div>

          <div></div>
        </Layout>
      )
    }
    
    return(<App {...this.props} />)
  }
}

export default Index;