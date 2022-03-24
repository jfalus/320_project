import "./../styles/Task.css";

function Task(props) {
  return (
    <div className="task">
      <div className="task-header">
        <nav>
          <div id="task-assigner">Assigner: {props.sender}</div>
          <div id="task-created-date">Created date: {props.createdDate}</div>
        </nav>
      </div>
      <br></br>
      <div className="task-body">Description: {props.description}</div>
      <br></br>
      <div className="task-footer">
        <form>
          Completed
          <input name="isCompleted" type="checkbox" />
        </form>
      </div>
    </div>
  );
}

export default Task;
