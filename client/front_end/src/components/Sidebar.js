import React from "react";
import "../styles/Sidebar.css";
import CustomTask from "./Task/CustomTask.js";
import PTORequest from "./Task/PTORequest.js";
import TrainingRequest from "./Task/TrainingRequest.js";
import PerformanceReview from "./Task/PerformanceReview.js";
import { Dropdown } from "react-bootstrap";
import { get } from "superagent";

function Sidebar(props) {
  const [ptoData, setPtoData] = React.useState(null);
  const [prData, setPrData] = React.useState(null);
  const [trainData, setTrainData] = React.useState(null);
  const [genData, setGenData] = React.useState(null);
  const {updateCategory} = props;

  React.useEffect(() => {
    get("/api/empTasks/ptoRequests")
      .then((res) => res.json())
      .then((ptoData) => setPtoData(ptoData.message));
  }, []);
  React.useEffect(() => {
    get("/api/empTasks/performanceReviews")
      .then((res) => res.json())
      .then((prData) => setPrData(prData.message));
  }, []);
  React.useEffect(() => {
    get("/api/empTasks/assignedTrainings")
      .then((res) => res.json())
      .then((trainData) => setTrainData(trainData.message));
  }, []);
  React.useEffect(() => {
    get("/api/empTasks/generalTasks")
      .then((res) => res.json())
      .then((genData) => setGenData(genData.message));
  }, []);

  async function categoryClick(category) {
    updateCategory(category);
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
            <p>{!ptoData ? "loading PTOs" : ptoData}</p>
            <span className="badge">3</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("Performance Review")}>
            <span>Performance Reviews</span>
            <p>{!prData ? "loading PRs" : prData}</p>
            <span className="badge">1</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("Training")}>
            <span>Trainings</span>
            <p>{!trainData ? "loading trainings" : trainData}</p>
            <span className="badge">4</span>
          </a>
          <br></br>

          <a href="#" className="notification" onClick={() => categoryClick("General Task")}>
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
