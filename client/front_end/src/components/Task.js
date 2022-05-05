import "../styles/Task.css";
import React, { Component } from "react";
import { Form } from "react-bootstrap";

class Task extends Component {
  UPDATE_ASSIGNED_TRAINING = "AssignedTraining";
  UPDATE_GENERAL_TASK = "GeneralTask";
  UPDATE_PERFORMANCE_REVIEW = "PerformanceReview";
  UPDATE_PTO_REQUEST = "PtoRequest";
}

class GeneralTask extends Task {
  render() {
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner">
              <b>Task ID:</b> {this.props.id}
            </div>
            <div id="task-created-date">
              <b>Created date:</b> {this.props.createdDate}
            </div>
          </nav>
        </div>
        <br></br>
        <div className="task-body">
          <b>Description:</b> {this.props.description}
        </div>
        <div className="task-footer">
          <nav>
            <div></div>
            <div id="task-progress">
              <b>Progress:</b> {this.props.progress}
            </div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div></div>
            <div className="progress-buttons">
              <a
                className="notstarted"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_GENERAL_TASK,
                    [
                      ["task_id", this.props.id],
                      ["progress", "Not-started"],
                    ],
                    true
                  );
                }}
              >
                <span class="task-button">0%</span>
              </a>
              <a
                className="todo"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_GENERAL_TASK,
                    [
                      ["task_id", this.props.id],
                      ["progress", "To-do"],
                    ],
                    true
                  );
                }}
              >
                <span class="task-button">50%</span>
              </a>
              <a
                className="completed"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_GENERAL_TASK,
                    [
                      ["task_id", this.props.id],
                      ["progress", "Complete"],
                    ],
                    true
                  );
                }}
              >
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
            <div id="task-assigner">
              <b>Task ID:</b> {this.props.id}
            </div>
            <div id="task-created-date">
              <b>Created date:</b> {this.props.createdDate}
            </div>
          </nav>
        </div>
        <div>
          <b>Link:</b>{" "}
          <a
            className="link"
            href={this.props.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.link}
          </a>{" "}
        </div>
        <br></br>
        <div className="task-body">
          <b>Description:</b> {this.props.description}
        </div>
        <div className="task-footer">
          <nav>
            <div></div>
            <div id="task-progress">
              <b>Progress:</b> {this.props.progress}
            </div>
          </nav>
        </div>
        <div className="task-toes">
          <nav>
            <div></div>
            <div className="progress-buttons">
              <a
                className="notstarted"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_ASSIGNED_TRAINING,
                    [
                      ["at_id", this.props.id],
                      ["progress", "Not-started"],
                    ],
                    true
                  );
                }}
              >
                <span class="task-button">0%</span>
              </a>
              <a
                className="todo"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_ASSIGNED_TRAINING,
                    [
                      ["at_id", this.props.id],
                      ["progress", "To-do"],
                    ],
                    true
                  );
                }}
              >
                <span class="task-button">50%</span>
              </a>
              <a
                className="completed"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.updateTask(
                    this.UPDATE_ASSIGNED_TRAINING,
                    [
                      ["at_id", this.props.id],
                      ["progress", "Complete"],
                    ],
                    true
                  );
                }}
              >
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
    let text =
      this.props.overallcomments != null ? this.props.overallcomments : "";
    let growth =
      this.props.growth_feedback != null ? this.props.growth_feedback : 1;
    let kindness =
      this.props.kindness_feedback != null ? this.props.kindness_feedback : 1;
    let delivery =
      this.props.delivery_feedback != null ? this.props.delivery_feedback : 1;
    return (
      <div className="task">
        <div className="task-header">
          <nav>
            <div id="task-assigner">
              <b>Task ID:</b> {this.props.id}
            </div>
            <div id="task-created-date">
              <b>Created Date:</b> {this.props.createdDate}
            </div>
          </nav>
        </div>
        <br></br>
        <div className="task-body">
          <b>Overall Comments:</b>
          {this.props.progress !== "Complete" ? (
            <Form.Control
              as="textarea"
              rows={4}
              onChange={(e) => {
                text = e.target.value;
              }}
            />
          ) : (
            this.props.overallcomments
          )}
        </div>
        <br></br>
        <div className="task-footer">
          <nav>
            {this.props.progress !== "Complete" ? (
              <nav className="task-feedback">
                <div>
                  <b>Growth:</b>
                  <Form.Control
                    as="select"
                    custom
                    ref={this.myRef}
                    onChange={(e) => {
                      growth = e.target.value;
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                </div>
                <div>
                  <b>Kindness:</b>
                  <Form.Control
                    as="select"
                    custom
                    ref={this.myRef}
                    onChange={(e) => {
                      kindness = e.target.value;
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                </div>
                <div>
                  <b>Delivery</b>
                  <Form.Control
                    as="select"
                    custom
                    ref={this.myRef}
                    onChange={(e) => {
                      delivery = e.target.value;
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Form.Control>
                </div>
              </nav>
            ) : (
              <nav className="task-feedback">
                <div>
                  <b>Growth:</b> {this.props.growth_feedback}
                </div>
                <div>
                  <b>Kindness:</b> {this.props.kindness_feedback}
                </div>
                <div>
                  <b>Delivery:</b> {this.props.delivery_feedback}
                </div>
              </nav>
            )}
            <div id="task-progress">
              <div>
                <b>Progress:</b> {this.props.progress}
              </div>
            </div>
          </nav>
        </div>
        {this.props.progress !== "Complete" ? (
          <div className="task-toes">
            <nav>
              <div></div>
              <div className="progress-buttons">
                {/* <a href="#" className="notstarted" onClick={(e) => {e.preventDefault(); this.props.updateTask(this.UPDATE_PERFORMANCE_REVIEW, [['pr_id', this.props.id],['creator', this.props.e_id], ['progress', 'Not-started'], ['growth', growth], ['kindness', kindness], ['delivery', delivery], ['comments', text]], true)}}>
                <span class="task-button">0%</span>
              </a>
              <a href="#" className="todo" onClick={(e) => {e.preventDefault(); this.props.updateTask(this.UPDATE_PERFORMANCE_REVIEW, [['pr_id', this.props.id],['creator', this.props.e_id],['progress', 'To-do'], ['growth', growth], ['kindness', kindness], ['delivery', delivery], ['comments', text]], true)}}>
                <span class="task-button">50%</span>
              </a> */}
                <a
                  href="#"
                  className="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.updateTask(
                      this.UPDATE_PERFORMANCE_REVIEW,
                      [
                        ["pr_id", this.props.id],
                        ["creator", this.props.e_id],
                        ["progress", "Complete"],
                        ["growth", growth],
                        ["kindness", kindness],
                        ["delivery", delivery],
                        ["comments", text],
                      ],
                      true
                    );
                  }}
                >
                  <span class="task-button">Submit</span>
                </a>
              </div>
            </nav>
          </div>
        ) : (
          <div></div>
        )}
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
            <div id="task-assigner">
              <b>Task ID:</b> {this.props.id}
            </div>
            <div className="task-timeframe">
              <div>
                <b>Start Date:</b> {this.props.start_date}
              </div>
              <div>
                <b>End Date:</b> {this.props.end_date}
              </div>
            </div>
            <div id="task-created-date">
              <b>Created date:</b> {this.props.createdDate}
            </div>
          </nav>
        </div>
        <div className="task-body">
          <div>
            <b>Description:</b> {this.props.description}
          </div>
        </div>
        <br></br>
        <div className="task-footer">
          <nav>
            {this.props.progress !== "Complete" ? (
              <div id="task-approval">
                <b>Approval: </b>
                <a
                  className="reject"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.updateTask(
                      this.UPDATE_PTO_REQUEST,
                      [
                        ["pto_id", this.props.id],
                        ["progress", "Complete"],
                        ["approved", false],
                        ["creator", this.props.e_id],
                        ["start_date", this.start_date],
                        ["end_date", this.end_date],
                      ],
                      true
                    );
                  }}
                >
                  <span class="approval-button">reject</span>
                </a>
                <a
                  className="accept"
                  onClick={(e) => {
                    e.preventDefault();
                    this.props.updateTask(
                      this.UPDATE_PTO_REQUEST,
                      [
                        ["pto_id", this.props.id],
                        ["progress", "Complete"],
                        ["approved", true],
                        ["creator", this.props.e_id],
                        ["start_date", this.start_date],
                        ["end_date", this.end_date],
                      ],
                      true
                    );
                  }}
                >
                  <span class="approval-button">accept</span>
                </a>
              </div>
            ) : this.props.approved ? (
              <div id="task-approval">
                <b>Approval: </b> Accepted
              </div>
            ) : (
              <div id="task-approval">
                <b>Approval: </b> Rejected
              </div>
            )}
            <div id="task-progress">
              <b>Progress:</b> {this.props.progress}
            </div>
          </nav>
        </div>
      </div>
    );
  }
}

export { GeneralTask, PTOTask, PRTask, TrainingTask };
