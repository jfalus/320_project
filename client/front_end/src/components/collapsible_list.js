import useCollapse from "react-collapsed";
import {Task, PTOTask, PRTask, TrainingTask} from "./Task.js";
import "./../styles/MainContent.css";

function Section(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const category = props.category;
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  if (category === "General Task") {
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
              assigner={props.assigner}
              createdDate={props.createdDate}
              link={props.link}
              description={props.description}
              progress = {props.progress}
            />
          </div>
        </div>
      </div>
    );
  }
  else if (category === "Training Request") {
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
            <TrainingTask
              dueDate={props.dueDate}
              createdDate={props.createdDate}
              link={props.link}
              description={props.description}
              progress = {props.progress}
            />
          </div>
        </div>
      </div>
    );
  }
  else if (category === "Performance Review Request") {
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
            <PRTask
              dueDate={props.dueDate}
              assigner={props.assigner}
              createdDate={props.createdDate}
              overallcomments={props.overallcomments}
              growth_feedback={props.growth_feedback}
              kindness_feedback={props.kindness_feedback}
              delivery_feedback={props.delivery_feedback}
              progress = {props.progress}
            />
          </div>
        </div>
      </div>
    );
  }
  else if (category === "Paid Time Off Request") {
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
            <PTOTask
              dueDate={props.dueDate}
              assigner={props.assigner}
              createdDate={props.createdDate}
              start_date={props.start_date}
              end_date={props.end_date}
              description={props.description}
              growth_feedback={props.growth_feedback}
              kindness_feedback={props.kindness_feedback}
              delivery_feedback={props.delivery_feedback}
              approval = {props.approval}
              progress = {props.progress}
          />
          </div>
        </div>
      </div>
    );
  }
}

export default Section;
