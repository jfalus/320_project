import React from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";

function Sidebar() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/empTasks/ptoRequests")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="sidebar">
      <li>
        <div className="createTask">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Create Task
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <PTORequest category="PTO Request" />
              <p>{!data ? "hello world" : data}</p>
              <TrainingRequest category="Training Request" />
              <PerformanceReview category="Performance Review" />
              <CustomTask category="Custom Task" />
            </Dropdown.Menu>
          </Dropdown>
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
