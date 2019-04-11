import React, { Component } from "react";
import axios from "axios";

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: this.props.taskData.subject,
      task: this.props.taskData.task,
      date: new Date(`${this.props.taskData.date}`).toDateString(),
      time: this.props.taskData.time,
      taskId: this.props.taskData._id
    };
    this.updateData = this.updateData.bind(this);
  }
  onChangeSubject = e => {
    this.setState({
      subject: e.target.value
    });
  };
  onChangeTask = e => {
    this.setState({
      task: e.target.value
    });
  };
  onChangeDate = e => {
    this.setState({
      date: e.target.value
    });
  };
  onChangeTime = e => {
    this.setState({
      time: e.target.value
    });
  };
  test(e) {
    e.preventDefault();
    console.log(this.state.taskId);
  }
  updateData = id => {
    console.log(id);

    const obj = {
      subject: this.state.subject,
      task: this.state.task,
      date: this.state.date,
      time: this.state.time
    };

    axios.post("/updateData/" + id, obj).then(res => console.log(res));
  };
  render() {
    console.log(this.state.taskId);
    return (
      <div>
        <i
          onClick={e => this.test(e)}
          data-toggle="modal"
          data-target={`#exampleModal${this.state.taskId}`}
          title="Edit Task"
          className="fas fa-edit fa-lg ml-2 mr-1 text-primary"
        />
        <div
          id={`exampleModal${this.state.taskId}`}
          className="modal mt-5 p-0 "
        >
          <h4 className="text-center mt-3">Edit your Task</h4>
          <form
            className="mt-3"
            onSubmit={() => this.updateData(`${this.state.taskId}`)}
          >
            <input
              type="text"
              value={this.state.subject}
              onChange={this.onChangeSubject}
            />
            <input
              type="text"
              value={this.state.task}
              onChange={this.onChangeTask}
            />
            <input
              type="text"
              value={this.state.date}
              onChange={this.onChangeDate}
              required
            />
            <input
              type="text"
              value={this.state.time}
              onChange={this.onChangeTime}
            />
            <div className="modal-footer">
              <input
                type="submit"
                className="btn btn-primary mr-1"
                value="save"
              />
              <button
                type="button"
                className="btn btn-secondary ml-1"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateForm;
