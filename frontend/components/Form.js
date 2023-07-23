import React from 'react'

export default class Form extends React.Component {
  render() {
    return (
      <>
      <form id="todoForm" onSubmit={this.props.onTodoFormSubmit}>
          <input 
            value={this.props.state.todoNameInput} 
            onChange={this.props.todoNameInputChange}
            type="text" 
            placeholder='Type todo'>
          </input>  
          <button>Submit</button>
      </form>  
      <button 
        onClick={this.props.toggleDisplayCompleted}
      >
        {this.props.state.displayCompleted ? 'Hide' : 'Show'} Completed
      </button>
      </>
    )
  }
}
