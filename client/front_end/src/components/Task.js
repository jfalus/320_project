import "../styles/Task.css";
import React, { Component } from 'react';

class GeneralTask extends Component {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner"><b>Assigner:</b> {this.props.assigner}</div>
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
              <a href="#" className="notstarted">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="todo">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="completed">
                <span class="task-button">...</span>
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
            <div id="task-assigner"><b>Assigner:</b> System</div>
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
              <a href="#" className="notstarted">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="todo">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="completed">
                <span class="task-button">...</span>
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
            <div id="task-assigner"><b>Assigner:</b> {this.props.assigner}</div>
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
              <a href="#" className="notstarted">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="todo">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="completed">
                <span class="task-button">...</span>
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
            <div id="task-assigner"><b>Assigner:</b> {this.props.assigner}</div>
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
            <div className="approve-buttons">
              <a href="#" className="reject">
                <span class="task-button">reject</span>
              </a>
              <a href="#" className="accept">
                <span class="task-button">accept</span>
              </a>
            </div>
            <div className="progress-buttons">
              <a href="#" className="notstarted">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="todo">
                <span class="task-button">...</span>
              </a>
              <a href="#" className="completed">
                <span class="task-button">...</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export {GeneralTask, PTOTask, PRTask, TrainingTask};