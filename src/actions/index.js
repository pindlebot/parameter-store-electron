export const SET_PARAMETERS = 'SET_PARAMETERS'
export const ADD_PARAMETER = 'ADD_PARAMETER'
export const DESTROY_ALL = 'DESTROY_ALL'
export const DESTROY_PARAMETER = 'DESTROY_PARAMETER'

export const REVEAL_VALUE = 'REVEAL_VALUE'
export const ADD_NAMESPACE = 'ADD_NAMESPACE'
export const SET_NAMESPACE = 'SET_NAMESPACE'
export const SET_NAMESPACES = 'SET_NAMESPACES'
export const DESTROY_NAMESPACE = 'DESTROY_NAMESPACE'
export const CONFIG_ERROR = 'CONFIG_ERROR'
export const UPDATE_CONFIG = 'UPDATE_CONFIG'

export const UPDATE_PATHNAME = 'UPDATE_PATHNAME'

export function addParameter(parameter) {
  return {
    type: ADD_PARAMETER,
    parameter
  };
}

export function setParameters(parameters) {
  return {
    type: SET_PARAMETERS,
    parameters
  }
}

export function destroyAll() {
  return {
    type: DESTROY_ALL
  }
}


export function destroyParameter(id) {
  return {
    type: DESTROY_PARAMETER,
    id
  }
}

export function revealValue(parameter) {
  
  return {
    type: REVEAL_VALUE,
    parameter
  }
}

export function addNamespace(namespace) {
  return {
    type: ADD_NAMESPACE,
    namespace
  }
}

export function setNamespaces(namespaces) {
  return {
    type: SET_NAMESPACES,
    namespaces
  }
} 

export function setNamespace(namespace) {
  return {
    type: SET_NAMESPACE,
    namespace
  }
}

export function destroyNamespace(namespace) { 
  return {
    type: DESTROY_NAMESPACE,
    namespace
  }
}

export function configError(error) {
  return {
    type: CONFIG_ERROR,
    error
  }
}

export const updateConfig = (credentials) => ({
  type: UPDATE_CONFIG,
  credentials
})

export const updatePathname = (pathname) => ({
  type: UPDATE_PATHNAME,
  pathname,
})