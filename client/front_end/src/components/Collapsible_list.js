import useCollapse from "react-collapsed";
import Task from "./Task.js";
import "./../styles/MainContent.css";

function Section(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };

  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        {/* <div className="starred" type="checkbox"></div> */}
        <div className="category">{props.category}</div>
        <div className="title">{props.title}</div>
        <div className="dueDate">Due Date: {props.dueDate}</div>
        <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">
          {props.children}
          <Task
            dueDate={props.dueDate}
            sender={props.sender}
            createdDate={props.createdDate}
            description={props.description}
          />
        </div>
      </div>
    </div>
  );
}

export default Section;
