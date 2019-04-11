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
      time: "",
      icon: "done"
    };
  }
  componentWillMount() {
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
  taskDone = e => {
    let elm = e.target.parentElement.parentElement;
    console.log(e.target);
    elm.classList.toggle("background-green");
  };
  render() {
    return (
      <div>
        {this.state.arr.map(todo => {
          let date = new Date(`${todo.date}`);
          let taskDay = date.toDateString();
          console.log(date);
          return (
            <div key={todo._id} className=" taskDiv container">
              <ul className="list-group ">
                <li className="taskItem m-1 list-group-item">
                  <h6>
                    <b>{todo.subject}</b>
                  </h6>
                  <span>
                    {todo.task} On {taskDay} At {todo.time}
                  </span>
                  <div className="row d-flex justify-content-center mb-0 align-items-center">
                    <i
                      onClick={() => this.deleteData(`${todo._id}`)}
                      className="fas fa-trash-alt text-danger fa-lg"
                      title="delete Task"
                    />
                    <UpdateForm key={todo._id} taskData={todo} />{" "}
                    <i
                      onClick={this.taskDone}
                      className="fas fa-check-circle fa-lg"
                      title="done"
                    />
                    &nbsp;
                  </div>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ToDoList;
