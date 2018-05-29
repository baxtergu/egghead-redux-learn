import React, { Component } from 'react';
import { createStore } from 'redux';
import logo from './logo.svg';
import './App.css';

const counter = (state = { value: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { value: state.value + 1 };
    case 'DECREMENT':
      return { value: state.value - 1 };
    default:
      return state;
  }
};

const store = createStore(counter);

class Counter extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.value}</h1>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // bind click function context with component
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    // function for store subscribe
    this.onChange = this.onChange.bind(this);
    // function to return own state
    this.getOwnState = this.getOwnState.bind(this);
    // init component state
    this.state = this.getOwnState();
  }

  onIncrement() {
    store.dispatch({
      type: 'INCREMENT'
    });
  }

  onDecrement() {
    store.dispatch({
      type: 'DECREMENT'
    });
  }

  onChange() {
    this.setState(this.getOwnState());
  }

  getOwnState() {
    return store.getState();
  }

  componentDidMount() {
    store.subscribe(this.onChange);
  }

  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }

  render() {
    return (
      <Counter
        value={this.state.value}
        onIncrement={this.onIncrement}
        onDecrement={this.onDecrement}
      />
    );
  }
}

export default App;
