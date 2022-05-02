import "../styles/Task.css";
import React, { Component } from 'react';

class Task extends Component {
  UPDATE_ASSIGNED_TRAINING = "AssignedTraining";
  UPDATE_GENERAL_TASK = "GeneralTask";
  UPDATE_PERFORMANCE_REVIEW = "PerformanceReview";
  UPDATE_PTO_REQUEST = "PtoRequest";

  // Accesses an UPDATE endpoint, returns boolean
  // ##################################################################################################################
  // IMPORTANT: See 320_PROJECT/server/endpoints/<taskType>/update<taskType>.js for required body fields for <taskType>
  // ##################################################################################################################
  // task_kind should be one of the above Strings.
  // bodyFields should be an array. Each element is another array of length 2, where element 0 is the name of the body field (String) and element 1 is the value of that body field.
  async updateTask(task_kind, bodyFields, debug=false)
  {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    bodyFields.forEach(f => {
      urlencoded.append(f[0], f[1]);
    })
    var request_options = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'error'
    };
    var ret;
    await fetch("/api/empTasks/update" + task_kind, request_options)
        .then(res => {
          if (res.redirected) {
            window.location.href = res.url;
          }
          return res;
        })
        .then(response => response.text())
        .then(result => {
          if(debug) {console.log("Update " + task_kind + ":\n" + result);}
          ret = result === "true";
        })
        .catch(error => console.log('error', error));
    return ret;
  }
}

class GeneralTask extends Task {
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
              <a href="#" className="notstarted" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_GENERAL_TASK, [['task_id', this.props.id],['progress', 'Not-started']], true); window.location.reload(false)}}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_GENERAL_TASK, [['task_id', this.props.id],['progress', 'To-do']], true); window.location.reload(false)}}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_GENERAL_TASK, [['task_id', this.props.id],['progress', 'Complete']], true); window.location.reload(false)}}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class TrainingTask extends Task {
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
              <a href="#" className="notstarted" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_ASSIGNED_TRAINING, [['at_id', this.props.id],['progress', 'Not-started']], true); window.location.reload(false)}}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_ASSIGNED_TRAINING, [['at_id', this.props.id],['progress', 'To-do']], true); window.location.reload(false)}}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={(e) => {e.preventDefault(); this.updateTask(this.UPDATE_ASSIGNED_TRAINING, [['at_id', this.props.id],['progress', 'Complete']], true); window.location.reload(false)}}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class PRTask extends Task {
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
              <a href="#" className="notstarted" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PERFORMANCE_REVIEW, [['pr_id', this.props.id],['progress', 'Not-started'], ['growth', this.props.growth_feedback], ['kindness', this.props.kindness_feedback], ['delivery', this.props.delivery_feedback], ['comments', this.props.overallcomments]], true)){ window.location.reload(false)}}}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PERFORMANCE_REVIEW, [['pr_id', this.props.id],['progress', 'To-do'], ['growth', this.props.growth_feedback], ['kindness', this.props.kindness_feedback], ['delivery', this.props.delivery_feedback], ['comments', this.props.overallcomments]], true)){ window.location.reload(false)}}}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PERFORMANCE_REVIEW, [['pr_id', this.props.id],['progress', 'Complete'], ['growth', this.props.growth_feedback], ['kindness', this.props.kindness_feedback], ['delivery', this.props.delivery_feedback], ['comments', this.props.overallcomments]], true)){ window.location.reload(false)}}}>
                <span class="task-button">100%</span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

class PTOTask extends Task {
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
            <div id="task-approval"><b>Approved:</b> {this.props.approved.toString().toUpperCase()}</div>
            <div id="task-progress"><b>Progress:</b> {this.props.progress}</div>
          </nav>
        </div>
          <div className="task-toes">
          <nav>
              {(!this.props.approved) ?  (<div>
              <a href="#" className="reject" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PTO_REQUEST, [['pto_id', this.props.id],['approved', false]], true)){ window.location.reload(false)}}}>
                <span class="approval-button">reject</span>
              </a>
              <a href="#" className="accept" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PTO_REQUEST, [['pto_id', this.props.id],['approved', true]], true)){ window.location.reload(false)}}}>
                <span class="approval-button">accept</span>
              </a>
            </div>): (<div/>)}
            <div className="progress-buttons">
              <a href="#" className="notstarted" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PTO_REQUEST, [['pto_id', this.props.id],['progress', 'Not-started']], true)){ window.location.reload(false)}}}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PTO_REQUEST, [['pto_id', this.props.id],['progress', 'To-do'], ['approved', this.props.approved], ['start_date', this.start_date], ['end_date', this.end_date]], true)){window.location.reload(false)}}}>
                <span class="task-button">50%</span>
              </a>
              <a href="#" className="completed" onClick={(e) => {e.preventDefault(); if(!this.updateTask(this.UPDATE_PTO_REQUEST, [['pto_id', this.props.id],['progress', 'Complete']], true)){ window.location.reload(false)}}}>
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