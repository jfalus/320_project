import React, { useState } from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";
import { get } from "superagent";

//Sidebar with asynchronous clicking functionality
function Sidebar(props) {

  const {updateCategory, updateFilter, counts} = props;
  const [categoryClass, setCategoryClass] = useState(["notification", "notification", "notification", "notification"]);
  const [currentCategory, setCurrentCategory] = useState("None");
  const [filtersClass, setFiltersClass] = useState(["notification", "notification", "notification"]);
  const [currentFilter, setCurrentFilter] = useState("None");

  async function categoryClick(category) {
    updateCategory(category);
    if(category == currentCategory) {
      setCategoryClass(["notification", "notification", "notification", "notification"]);
      setCurrentCategory("None");
      console.log("REACHED HERE!")
    }
    else {
      console.log("REACHED!")
      if(category == "Paid Time Off Request") {
        setCategoryClass(["notificationClicked", "notification", "notification", "notification"]);
      }
      else if(category == "Performance Review") {
        setCategoryClass(["notification", "notificationClicked", "notification", "notification"]);
      }
      else if(category == "Assigned Training") {
        setCategoryClass(["notification", "notification", "notificationClicked", "notification"]);
      }
      else if(category == "General Task") {
        setCategoryClass(["notification", "notification", "notification", "notificationClicked"]);
      }
      setCurrentCategory(category);
    }
  }

  async function filtersClick(filter) {
    updateFilter(filter);
    if(filter == currentFilter) {
      setFiltersClass(["notification", "notification", "notification"]);
      setCurrentFilter("None");
    }
    else {
      if(filter == "Not-started") {
        setFiltersClass(["notificationClicked", "notification", "notification"]);
      }
      else if(filter == "To-do") {
        setFiltersClass(["notification", "notificationClicked", "notification"]);
      }
      else if(filter == "Completed") {
        setFiltersClass(["notification", "notification", "notificationClicked"]);
      }
      setCurrentFilter(filter);
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
          <a className={categoryClass[0]} onClick={() => categoryClick("Paid Time Off Request")}>
            <span>PTO Requests</span>
            <span className="badge" >{counts[0]}</span>
          </a>
          <br></br>

          <a className={categoryClass[1]} onClick={() => categoryClick("Performance Review")}>
            <span>Performance Reviews</span>
            <span className="badge" >{counts[1]}</span>
          </a>
          <br></br>

          <a className={categoryClass[2]} onClick={() => categoryClick("Assigned Training")}>
            <span>Trainings</span>
            <span className="badge" >{counts[2]}</span>
          </a>
          <br></br>

          <a className={categoryClass[3]} onClick={() => categoryClick("General Task")}>
            <span>General Tasks</span>
            <span className="badge" >{counts[3]}</span>
          </a>
          <br></br>
        </body2>
      </li>

      <li>
        <h2>
          <b>Filters</b>
        </h2>
        <body2>
          <a className={filtersClass[0]} onClick={() => filtersClick("Not-started")}>
            <span>Not Started</span>
          </a>
          <br></br>

          <a className={filtersClass[1]} onClick={() => filtersClick("To-do")}>
            <span>To Do</span>
          </a>
          <br></br>

          <a className={filtersClass[2]} onClick={() => filtersClick("Completed")}>
            <span>Completed</span>
          </a>
          <br></br>
        </body2>
      </li>
      
    </div>
  );
}

export default Sidebar;
