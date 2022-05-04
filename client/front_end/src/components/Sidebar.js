import React, { useState } from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";
import { get } from "superagent";

function Sidebar(props) {

  const {updateCategory, updateFilter, counts} = props;
  const [checkedFilter, setCheckedFilter] = useState(-1);

  async function categoryClick(category) {
    updateCategory(category);
  }

  async function filtersClick(e, filter) {
    const target = e.currentTarget;
    updateFilter(filter);
    if(target.checked && checkedFilter == target.value) {
      target.checked = false;
      setCheckedFilter(-1);
    }
    else {
      setCheckedFilter(target.value);
    }
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
        <div>
          <input type="radio" value={0} onClick={(e) => filtersClick(e, "Not-started")}/> Not Started
          <input type="radio" value={1} onClick={(e) => filtersClick(e, "To-do")}/> To-Do
          <input type="radio" value={2} onClick={(e) => filtersClick(e, "Completed")}/> Completed
        </div>
      </li>

      <li>
        <h2>
          <b>Filters</b>
        </h2>
        <body2>
        <a href="#" className="notification" onClick={() => filtersClick("Not-started")}>
            <span>Not Started</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => filtersClick("To-do")}>
            <span>To Do</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => filtersClick("Completed")}>
            <span>Completed</span>
          </a>
          <br></br>
          <a href="#" className="notification" onClick={() => filtersClick("Completed")}>
            <span>Clear Filter</span>
          </a>
        </body2>
      </li>
      
    </div>
  );
}

export default Sidebar;
