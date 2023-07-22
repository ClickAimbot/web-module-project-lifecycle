import React from 'react'

export default class TodoList extends React.Component {
  render() {
    return (
      <div fetchAllTodos={this.props.fetchAllTodos()}>
      <div id="error">Error: {this.state.error}</div>
      <h2>Todos</h2>
        {
          this.state.todos.map(todo => {
            return <div key={todo.id}>{todo.name}</div>
          })
        }
      </div>
    )
  }
}
