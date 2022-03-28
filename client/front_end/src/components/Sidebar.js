import React, { useState } from "react";
import "../styles/Sidebar.css";
import { Container } from "./Container.js";

function Sidebar() {
  const triggerText = "Create Task";
  const onSubmit = (event) => {
    event.preventDefault(event);
    console.log(event.target.name.value);
    console.log(event.target.email.value);
  };

  return (
    <div className="sidebar">
      <li>
        <div className="createTask">
          <Container triggerText={triggerText} onSubmit={onSubmit} />
        </div>
      </li>

      <li>
        <h2>
          <b>Categories</b>
        </h2>
        <br></br>
        <br></br>

        <body2>
          <a href="#" className="notification">
            <span>PTO Requests</span>
            <span className="badge">3</span>
          </a>
          <br></br>
          <br></br>

          <a href="#" className="notification">
            <span>Performance Reviews</span>
            <span className="badge">1</span>
          </a>
          <br></br>
          <br></br>

          <a href="#" className="notification">
            <span>Trainings</span>
            <span className="badge">4</span>
          </a>
          <br></br>
        </body2>
      </li>

      <li>
        <div className="dropdown">
          <button className="dropbtn">
            Filters <i className="fa fa-caret-down" aria-hidden="true"></i>
          </button>

          <div className="dropdown-content">
            <a target="_blank" href="">
              TODO
            </a>
            <a target="_blank" href="">
              IN PROGRESS
            </a>
            <a target="_blank" href="">
              COMPLETED
            </a>
          </div>
        </div>
      </li>

      <div id="settings">
        SETTINGS{" "}
        <a href="google.com">
          <i className="fa fa-cog fa-3x" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}

export default Sidebar;
