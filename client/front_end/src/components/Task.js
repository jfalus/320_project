import "../styles/Task.css";
import React, { Component } from 'react';
import {Home} from "./../pages/Home.js";

class GeneralTask extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner"><b>Task ID:</b> {this.props.id}</div>
            <div id="task-created-date"><b>Created date:</b> {this.props.createdDate}</div>
          </nav>
        </div>
        <br></br>
        <div className="task-body"><b>Description:</b> {this.props.description}</div>
        <div className="task-footer">
          <nav>
            <div></div>
            <div id="task-progress"><b>Progress:</b> {this.props.progress}</div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div></div>
            <div className="progress-buttons">
              <a href="#" className="notstarted" onClick={() => console.log("not started")}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={() => console.log("to do")}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={() => console.log("completed")}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class TrainingTask extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner"><b>Task ID:</b> {this.props.id}</div>
            <div id="task-created-date"><b>Created date:</b> {this.props.createdDate}</div>
          </nav>
        </div>
        <div><b>Link:</b> <a className="link" href={this.props.link} target="_blank" rel="noopener noreferrer">{this.props.link}</a> </div>
        <br></br>
        <div className="task-body"><b>Description:</b> {this.props.description}</div>
        <div className="task-footer">
          <nav>
            <div></div>
            <div id="task-progress"><b>Progress:</b> {this.props.progress}</div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div></div>
            <div className="progress-buttons">
              <a href="#" className="notstarted" onClick={() => console.log("not started")}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={() => console.log("to do")}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={() => console.log("completed")}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class PRTask extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner"><b>Task ID:</b> {this.props.id}</div>
            <div id="task-created-date"><b>Created Date:</b> {this.props.createdDate}</div>
          </nav>
        </div>
        <br></br>
        <div className="task-body">
          <div><b>Overall Comments:</b> {this.props.overallcomments}</div>
          <br></br>
        </div>
        <div className="task-footer">
          <nav>
            <nav className="task-feedback">
              <div><b>Growth:</b> {this.props.growth_feedback}</div>
              <div><b>Kindness:</b> {this.props.kindness_feedback}</div>
              <div><b>Delivery:</b> {this.props.delivery_feedback}</div>
            </nav>
            <div id="task-progress">
              <div><b>Progress:</b> {this.props.progress}</div>
            </div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div></div>
            <div className="progress-buttons">
              <a href="#" className="notstarted" onClick={() => console.log("not started")}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={() => console.log("to do")}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={() => console.log("completed")}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class PTOTask extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner"><b>Task ID:</b> {this.props.id}</div>
            <div className="task-timeframe">
              <div><b>Start Date:</b> {this.props.start_date}</div>
              <div><b>End Date:</b> {this.props.end_date}</div>
            </div>
            <div id="task-created-date"><b>Created date:</b> {this.props.createdDate}</div>
          </nav>
        </div>
        <div className="task-body">
          <div><b>Description:</b> {this.props.description}</div>
        </div>
        <br></br>
        <div className="task-footer">
          <nav>
            <div id="task-approval"><b>Approved:</b> {this.props.approval}</div>
            <div id="task-progress"><b>Progress:</b> {this.props.progress}</div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div>
              <a href="#" className="reject" onClick={() => console.log("rejected")}>
                <span class="approval-button">reject</span>
              </a>
              <a href="#" className="accept" onClick={() => console.log("accepted")}>
                <span class="approval-button">accept</span>
              </a>
            </div>
            <div className="progress-buttons">
              <a href="#" className="notstarted" onClick={() => console.log("not started")}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={() => console.log("to do")}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={() => console.log("completed")}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export {GeneralTask, PTOTask, PRTask, TrainingTask};