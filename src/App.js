import React, { Component } from 'react';
import { withStatechart } from 'react-automata';

const isNotZero = count => count > 0;

const DEFAULT_STATE = { count: 0 };
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const statechart = {
  initial: 'start',
  states: {
    start: {
      on: {
        INCREMENT: {
          start: {
            actions: ['increment']
          }
        },
        DECREMENT: {
          start: {
            actions: ['decrement'],
            cond: isNotZero
          }
        }
      }
    }
  }
};

class App extends Component {
  state = DEFAULT_STATE;

  handleOnIncrement = this.handleOnIncrement.bind(this);
  handleOnDecrement = this.handleOnDecrement.bind(this);

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  handleOnIncrement() {
    this.props.transition(INCREMENT);
  }

  handleOnDecrement() {
    this.props.transition(DECREMENT, this.state.count);
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnIncrement}>+</button>
        <span>{this.state.count}</span>
        <button onClick={this.handleOnDecrement}>-</button>
      </div>
    );
  }
}

export default withStatechart(statechart)(App);
