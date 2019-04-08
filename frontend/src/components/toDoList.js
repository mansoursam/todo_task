import React, { Component } from "react";
import axios from "axios";
import UpdateForm from "./updateForm";
class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      subject: "",
      task: "",
      date: "",
      time: ""
    };
  }
  componentDidMount() {
    this.getList();
  }
  //fetch data from our database
  getList = () => {
    fetch("/getData")
      .then(res => res.json())
      .then(data => {
        this.setState({
          arr: data
        });
      });
  };
  //delete task by id
  deleteData = id => {
    console.log(id);
    axios
      .delete("/deleteData/" + id)
      .then(res => {
        this.getList();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <div className="container taskDiv">
        <ul className="list-group ">
          {this.state.arr.map(todo => {
            let date = new Date(`${todo.date}`);
            let taskDay = date.toDateString();
            console.log(date);
            return (
              <li key={todo._id} className="taskItem m-1 list-group-item">
                <b> {todo.subject}</b>
                <br /> {todo.task} on {taskDay} at {todo.time}
                <div className="float-right">
                  <i
                    onClick={() => this.deleteData(`${todo._id}`)}
                    className="material-icons text-danger"
                    title="delete Task"
                  >
                    delete
                  </i>
                  <UpdateForm key={todo._id} taskData={todo} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default ToDoList;
