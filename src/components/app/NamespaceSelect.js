import React from 'react'
import Select from 'react-select';
import * as actions from '../../actions';
import { get } from 'lodash'

class NamespaceSelect extends React.Component {

  constructor(props) {
    super(props)


    this.onClick = this.onClick.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onClick (option) {
    console.log(option)
    this.props.dispatch(
      actions.addNamespace({label: option.label, value: option.value})
    )
  }

  onChange(value) {
    if(value === null) {
      //this.props.dispatch(
      //  actions.destroyNamespace({
      //    ...this.props.options.find(o => 
      //      o.selected
      //    )
      //  })
      //)
    } else {
      this.props.dispatch(
        actions.setNamespace({value: value.value, label: value.label})
      )
    }
  }

  render() {
    if(!this.props.namespace) {
      return false
    }
    const options = get(this.props.namespace, ['options'], [])

    const selected = get(this.props.namespace, ['selected'], { label: 'All', value: 'All'})
    return(

      <Select.Creatable
        className="namespace-select"
        multi={false}
        options={options}
        onChange={this.onChange}
        value={selected}
        style={{width: '200px'}}
        onNewOptionClick={this.onClick}
      />

    )
  }
}

export default NamespaceSelect