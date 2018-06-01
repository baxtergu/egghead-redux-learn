import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// todo list index
let nextTodoId = 0;

// to filter out todo item that matchs the filter and return
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    default:
      return todos;
  }
};

// ------------------  Begin of Component Defination  ------------------

const AddTodo = ({ store }) => {
  let input;
  return (
    <div>
      <input ref={node => (input = node)} />
      <button
        onClick={() => {
          store.dispatch({
            type: 'ADD_TODO',
            id: nextTodoId++,
            text: input.value
          });
          input.value = '';
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

// single Todo component - function defined component
const Todo = ({ text, onClick, completed }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}
  >
    {text}
  </li>
);

// multi Todo component - function defined component
const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo.id} {...todo} onClick={() => onTodoClick(todo.id)} />
    ))}
  </ul>
);

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const store = props.store;
    const state = store.getState();
    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={id => store.dispatch({ type: 'TOGGLE_TODO', id })}
      />
    );
  }
}

// Link component - function defined component
const Link = ({ active, onClick, children }) => {
  if (active) {
    return <span>{children}</span>;
  }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {children}
    </a>
  );
};

// Filter component - class defined component
class FilterLink extends Component {
  render() {
    const props = this.props;
    const store = props.store;
    const state = props.store.getState();
    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({
            type: 'SET_VISIBILITY_FILTER',
            filter: props.filter
          });
        }}
      >
        {props.children}
      </Link>
    );
  }

  componentDidMount() {
    const store = this.props.store;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
}

// Footer Component
const Footer = ({ store }) => (
  <p>
    Show:{' '}
    <FilterLink filter="SHOW_ALL" store={store}>
      All
    </FilterLink>{' '}
    <FilterLink filter="SHOW_ACTIVE" store={store}>
      Active
    </FilterLink>{' '}
    <FilterLink filter="SHOW_COMPLETED" store={store}>
      Completed
    </FilterLink>
  </p>
);

// TodoApp Entrance
const TodoApp = ({ store }) => (
  <div>
    <AddTodo store={store} />
    <VisibleTodoList store={store} />
    <Footer store={store} />
  </div>
);

// subscribe the store in the root component
class App extends Component {
  render() {
    return <TodoApp store={this.props.store} />;
  }
}

export default App;
