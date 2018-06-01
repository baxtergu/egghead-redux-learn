import React from 'react';
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
// import PropTypes from 'prop-types';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// -----------------  Begin of Reducers and Store Defination -------------------

// single todo item reducer
const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      };
    default:
      return state;
  }
};

// todo list content reducer
const todosReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, todoReducer(undefined, action)];
    case 'TOGGLE_TODO':
      return state.map(t => todoReducer(t, action));
    default:
      return state;
  }
};

// todo list visibility reducer
const visibilityFilterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// -----------------  End of Reducers and Store Defination -------------------

// use combined reducers to initialize the store
const store = createStore(
  combineReducers({
    todos: todosReducer,
    visibilityFilter: visibilityFilterReducer
  })
);

// class Provider extends Component {
//   getChildContext() {
//     return { store: this.props.store };
//   }
//   render() {
//     return this.props.children;
//   }
// }

// Provider.childContextTypes = {
//   store: PropTypes.object
// };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
