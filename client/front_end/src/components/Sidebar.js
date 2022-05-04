import React from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";

//Sidebar with asynchronous clicking functionality
function Sidebar(props) {
  const {updateCategory, updateFilter, counts} = props;

  async function categoryClick(category) {
    updateCategory(category);
  }

  async function filtersClick(filter) {
    updateFilter(filter);
  }

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
          <a href="#" className="notification" onClick={() => categoryClick("Paid Time Off Request")}>
            <span>PTO Requests</span>
            <span className="badge" >{counts[0]}</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("Performance Review")}>
            <span>Performance Reviews</span>
            <span className="badge" >{counts[1]}</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("Assigned Training")}>
            <span>Trainings</span>
            <span className="badge" >{counts[2]}</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("General Task")}>
            <span>General Tasks</span>
            <span className="badge" >{counts[3]}</span>
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
            <a href="#" onClick={() => filtersClick("Not-started")}>
              NOT STARTED
            </a>
            <a href="#" onClick={() => filtersClick("To-do")}>
              TODO
            </a>
            <a href="#" onClick={() => filtersClick("Completed")}>
              COMPLETED
            </a>
          </div>
        </div>
      </li>

      
    </div>
  );
}

export default Sidebar;
