import React, { Component } from 'react';
import { withStatechart } from 'react-automata';

const isNotZero = count => count > 0;

const DEFAULT_STATE = { count: 0, isDoubleRate: false };
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const RESET = 'RESET';
const TOGGLE_DOUBLE = 'TOGGLE_DOUBLE';

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
        },
        RESET: {
          start: {
            actions: ['reset']
          }
        },
        TOGGLE_DOUBLE: 'double'
      }
    },
    double: {
      on: {
        INCREMENT: {
          double: {
            actions: ['incrementDouble']
          }
        },
        DECREMENT: {
          double: {
            actions: ['decrementDouble'],
            cond: isNotZero
          }
        },
        TOGGLE_DOUBLE: 'start'
      }
    }
  }
};

class App extends Component {
  state = DEFAULT_STATE;

  handleOnIncrement = this.handleOnIncrement.bind(this);
  handleOnDecrement = this.handleOnDecrement.bind(this);
  handleOnReset = this.handleOnReset.bind(this);
  handleToggleDouble = this.handleToggleDouble.bind(this);

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }

  incrementDouble() {
    this.setState({ count: this.state.count + 2 });
  }

  decrementDouble() {
    this.setState({ count: this.state.count - 2 });
  }

  reset() {
    this.setState(DEFAULT_STATE);
  }

  handleOnIncrement() {
    this.props.transition(INCREMENT);
  }

  handleOnDecrement() {
    this.props.transition(DECREMENT);
  }

  handleOnReset() {
    this.props.transition(RESET);
  }

  handleToggleDouble() {
    this.setState({ isDoubleRate: !this.state.isDoubleRate }, () => 
      this.props.transition(TOGGLE_DOUBLE));
  }

  render() {
    return (
      <div>
        <button onClick={this.handleOnIncrement}>+</button>
        <span>{this.state.count}</span>
        <button onClick={this.handleOnDecrement}>-</button>
        <button onClick={this.handleOnReset}>Reset</button>
        <button onClick={this.handleToggleDouble}>Double: {this.state.isDoubleRate ? 'On' : 'Off'}</button>
      </div>
    );
  }
}

export default withStatechart(statechart)(App);
