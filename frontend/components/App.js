import React from 'react'
import axios from 'axios';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      error: '',
      todoNameInput: ''
    }
  }
  todoNameInputChange = evt => {
    const { value } = evt.target;
    this.setState({ ...this.state, todoNameInput: value })
  }
  fetchAllTodos = () => {
    axios.get(URL)
    .then(res => {
      this.setState({ ...this.state, todos: res.data.data })
    })
    .catch(err => {
      this.setState({ ...this.state, error: err.response.data.message })
    })
  }

  componentDidMount() {
    console.log('component did mount');
    this.fetchAllTodos()
  }

  componentDidUpdate() {
    console.log('component did update')
  }

  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <div id="todos">
        <h2>Todos</h2>
          {
            this.state.todos.map(todo => {
              return <div key={todo.id}>{todo.name}</div>
            })
          }  
        </div>  
        <form id="todoForm">
          <input value={this.state.todoNameInput} onChange={this.todoNameInputChange}type="text" placeholder='Type todo'></input>  
          <button>Submit</button>
          <button>Clear Completed</button>
        </form>  
      </div>
    )
  }
}
