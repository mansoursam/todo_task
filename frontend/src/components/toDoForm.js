import React, { Component } from "react";
import TodoList from "./toDoList";
class Todoform extends Component {
  render() {
    return (
      <div>
        <div className="formStyle container mt-5 mb-5 ">
          <h2 className="text-center">ToDo App</h2>
          <form action="/createData" method="post" className="mb-4">
            <div className="input-field ">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" required />
            </div>
            <div className="input-field ">
              <label htmlFor="task">Task</label>
              <input
                id="task"
                required
                type="text"
                name="task"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Time</label>
              <input type="time" name="time" className="form-control" />
            </div>
            <button
              type="submit"
              className="waves-effect waves-light btn btn-large"
            >
              Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
        <TodoList />
      </div>
    );
  }
}
export default Todoform;
