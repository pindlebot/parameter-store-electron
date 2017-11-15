import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import debounce from 'debounce';
import configureStore from './store/configureStore'; 
import { REVEAL_VALUE, SET_PARAMETERS, SET_NAMESPACES } from './actions/index';

const initialState = {
  namespace: {
    options: [],
    selected: { key: '', value: '' }
  },
  parameters: []
}

const ipc = require('electron').ipcRenderer
const state = JSON.parse(localStorage.getItem('state'))
const store = configureStore(state ? state : initialState);

const render = () => {
  const App = require('./components/app').default;
  ReactDOM.render(
    <AppContainer>
      <App {...store} />
    </AppContainer>, 
    document.getElementById('App')
  );
}

render();
if (module.hot) {
  module.hot.accept(render);
}

  const saveState = debounce(() => {
    localStorage.setItem('state', JSON.stringify(store.getState()))
  }, 5000);
  
  store.subscribe(() => {
    saveState();
    render(App);
    if (process.env.ENV === 'development') {
      console.log('state', store.getState());
    }
  });
  
  store.dispatch({ type: 'APP_INIT', store });

  ipc.on('data', (event, args) => {
    
    store.dispatch({
      type: REVEAL_VALUE, 
      parameter: JSON.parse(args) 
    })
  })

  ipc.on('init', (event, args) => {
    const namespaces = [...new Set(
      JSON.parse(args).filter(arg => 
        arg.key.split('/').length > 0
      ).map(arg => 
        arg.key.split('/')[1]
      )
    )]
    
    store.dispatch({
      type: SET_PARAMETERS,
      parameters: JSON.parse(args)
    })

    store.dispatch({
      type: SET_NAMESPACES,
      namespaces: namespaces.map(n => ({label: n, value: n}))
    })
  })