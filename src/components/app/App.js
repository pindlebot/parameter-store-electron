import React, { Component } from "react";
import * as actions from '../../actions';
import styles from '../../styles'
import Parameter from './Parameter'
import IconButton from './IconButton'
import NamespaceSelect from './NamespaceSelect'
import Dropdown from './Dropdown'
import Layout from './Layout'

const get = require('lodash.get')

const ipc = require('electron').ipcRenderer;

function Input(props) {
  return(
    <input 
    style={styles.input}
    onChange={props.onChange} value={props.value} />
  )
}

function RefreshIcon(props) {
  return(
  <div 
    onClick={() => props.clear()}
    style={styles.refreshIcon}>
    <i className="fa fa-refresh" />
  </div>)
}

function SubmitButton(props) {
  return(
    <div
    onClick={props.handleSubmit}
    style={styles.submitButton}>
      Submit
    </div>
  )
}

function Form(props) {
  return (
    <div
      onKeyDown={props.onKeyDown}
      onSubmit={props.onSubmit}
      style={{
        ...styles.row, 
        margin: '10px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '4px',
        maxHeight: '30px'
        //flexBasis: "7%"
      }}>
      {props.children}
    </div>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      key: "",
      input: {
        key: '',
        value: ''
      },
      revealed: {
        key: null,
        value: null
      },
      parameters: [],
      hover: null,
      gradient: {
        backgroundImage: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)'
      }
    };

    this.id = this.id.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.deleteParam = this.deleteParam.bind(this)
    this.revealParam = this.revealParam.bind(this)
    this.handleGradientClick = this.handleGradientClick.bind(this)
  }

  id () { return '_' + Math.random().toString(36).substr(2, 9); }


  onKeyDown (event) {
    if(event.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit() {
    const { input: { key } } = this.state;
    const param = {
      key: key,
      id: this.id()
    }    
    this.props.dispatch(
      actions.addParameter(param)
    )
    if(key.indexOf('/') > -1) {
      this.props.dispatch(
        actions.addNamespace({value: key, label: key})
      )
    }
    
    ipc.send('put', JSON.stringify(this.state.input))

    this.setState({
      input: { key: '', value: ''}
    })
  }

  onChange (name, e) {
    const { input } = this.state;
    input[name] = e.target.value;
    this.setState({input})
  }

  deleteParam (param) {
    this.setState({
      revealed: {
        key: null,
        value: null
      }
    })
    this.props.dispatch(
      actions.destroyParameter(param.id)
    )
    ipc.send('destroy', JSON.stringify(param))
  }

  revealParam (param) {
    console.log("Reavealing parameter...")
    if(param.value && param.value !== '') {
      this.props.dispatch(
        actions.revealValue({...param, value: ''})  
      )
    } else {
      ipc.send('get', JSON.stringify({key: param.key}))
      
    }
  }

  handleGradientClick(gradient) {
    this.setState({
      gradient
    })
  }

  render() {
    let { parameters, namespace } = this.props.getState();
    const selectedValue = get(namespace, ['selected', 'value'], null)
    if(selectedValue && selectedValue !== 'All') {
      parameters = parameters.filter(param => 
        param.key.indexOf(selectedValue) > -1
      )
    }
    return (
      <Layout gradient={this.state.gradient}>
     
        <Form onSubmit={this.handleSubmit} onKeyDown={this.onKeyDown}>
          <Input 
            value={this.state.input.key}
            onChange={e => this.onChange('key', e)} 
          />

          <Input 
            value={this.state.input.value} 
            onChange={e => this.onChange('value', e)} 
          />
          
          <IconButton icon="plus-circle" onClick={this.handleSubmit} />
        </Form>
        <div style={{margin: '10px'}}>
        {parameters.map(param => 
            <Parameter 
              onClick={() => this.revealParam(param)}
              onMouseEnter={() => this.setState({hover: param.id})}
              onMouseOut={() => this.setState({hover: null})}
              param={param} 
              hover={this.state.hover} 
              deleteParam={this.deleteParam}
              revealParam={this.revealParam}
              revealed={this.state.revealed}
            />
          )
        }
        </div>
        <div style={{
          margin: '10px',
          color: "#fff",
          fontSize: "12px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center"
        }}
        >  
        {parameters.some(p => p.value) ? 
          <span className="animated fadeOut">Copied to clipboard!</span> : ''}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <NamespaceSelect 
              {...this.props} 
              namespace={this.props.getState().namespace} 
            />	
            <Dropdown handleGradientClick={this.handleGradientClick} />
          </div>
        </div>
    
      </Layout>
    );
  }
}
