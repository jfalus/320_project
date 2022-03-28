import React, { Component } from "react";
import "../styles/GeneralTask.css";

export default class NewItem extends Component {
  handleClick = () => {
    this.props.toggle();
  };
  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={this.handleClick}>
            &times;{" "}
          </span>
          <p>New Task</p>
        </div>
      </div>
    );
  }
}
