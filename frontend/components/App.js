import React from 'react';
import axios from 'axios';

import TodoList from './TodoList'
import Form from './Form'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: '',
      displayCompleted: true,
    }
  }
  // 1.
  todoNameInputChange = evt => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value })
  }
  // helper
  resetForm = () => {
    this.setState({ ...this.state, todoNameInput: '' })
  }
  // helper
  setAxiosRespondError = err => this.setState({ ...this.state, error: err.response.data.message })
  // 2.
  postNewTodo = () => {
    axios.post(URL, { name: this.state.todoNameInput })
    .then(res => {
      this.setState({ ...this.state, todos: this.state.todos.concat(res.data.data) })
      this.resetForm(); 
    })
    .catch(this.setAxiosRespondError)
  }
  // 3.
  onTodoFormSubmit = evt => {
    evt.preventDefault();
    this.postNewTodo();
  }
  // 4.
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(this.setAxiosRespondError)
  }
  // 5.
  toggleCompleted = id => () => {
    axios.patch(`${URL}/${id}`)
      .then(res => {
        this.setState({ 
          ...this.state, todos: this.state.todos.map(todo => {
            if (todo.id !== id) return todo
            return res.data.data
        })})
      })
      .catch(this.setAxiosRespondError)
  }
  componentDidMount() {
    console.log('component did mount');
    this.fetchAllTodos()
  }

  componentDidUpdate() {
    console.log('component did update')
  }
  // 6.
  toggleDisplayCompleted = () => {
    this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList 
          todos={this.state.todos}
          displayCompleted={this.state.displayCompleted}
          toggleCompleted={this.toggleCompleted}
        /> 
        <Form 
          onTodoFormSubmit={this.onTodoFormSubmit} 
          todoNameInput={this.state.todoNameInput} 
          todoNameInputChange={this.todoNameInputChange} 
          toggleDisplayCompleted={this.toggleDisplayCompleted}
          displayCompleted={this.state.displayCompleted}
        />
      </div>
    )
  }
}
