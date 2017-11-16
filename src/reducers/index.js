import { combineReducers } from 'redux';
import * as actions from '../actions';
import { CONFIG_ERROR } from '../actions';

const findIndex = require('lodash.findindex')

const parametersReducer = (parameters = [], action) => {
  switch(action.type) {
    case actions.SET_PARAMETERS:
      return action.parameters;

    case actions.ADD_PARAMETER:
      parameters.push(action.parameter)
      return [...parameters]

    case actions.DESTROY_PARAMETER:
      parameters.splice(
        parameters.map(param => param.id).indexOf(action.id), 
        1
      )
      return [...parameters]

    case actions.REVEAL_VALUE:
      const param = action.parameter;
      console.log('param1', param)
      const i = findIndex(parameters, { key: param.key })
      parameters[i] = {...param, id: parameters[i].id }
      
      return [...parameters]
    default: 
      return parameters
  }
}

const initialState = {
  options: [],
  selected: { value: '', label: '' }
}

const optionsReducer = (state = initialState, action) => {
  const options = state.options || []

  switch(action.type) {
    case actions.ADD_NAMESPACE:

      options.push(action.namespace)
      return {
        ...state,
        options
      }

    case actions.SET_NAMESPACES:
      return {
        ...state,
        options: action.namespaces
      }

    case actions.SET_NAMESPACE:  

      return {
        ...state,
        selected: action.namespace
      }

    case actions.DESTROY_NAMESPACE:
      options.splice(
        options.map(o => o.value).indexOf(action.namespace.value), 
        1
      )
      return {
        ...state,
        selected: { value: '', label: '' }
      }
      
    default: 
      return state
  }
}

const configReducer = (state = {}, action) => {
  switch(action.type) {
    case CONFIG_ERROR:
      return {
        ...state,
        error: action.error
      }
    default: 
      return state;
  }
}

export default combineReducers({
  parameters: parametersReducer,
  namespace: optionsReducer, 
  config: configReducer
})
