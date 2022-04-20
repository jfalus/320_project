import React from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";

function Sidebar() {
  const [ptoData, setPtoData] = React.useState(null);
  const [prData, setPrData] = React.useState(null);
  const [trainData, setTrainData] = React.useState(null);
  const [genData, setGenData] = React.useState(null);

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
        <body2>
          <a href="#" className="notification">
            <span>PTO Requests</span>
            <p>{!ptoData ? "loading PTOs" : ptoData}</p>
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

          <a href="#" className="notification">
            <span>General Tasks</span>
            <p>{!genData ? "loading general tasks" : genData}</p>
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
