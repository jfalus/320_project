import React from "react";
import useCollapse from "react-collapsed";
import "./App.css";
function Section(props) {
  const config = {
    defaultExpanded: props.defaultExpanded || false,
    collapsedHeight: props.collapsedHeight || 0,
  };
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse(config);
  return (
    <div className="collapsible">
      <div className="header" {...getToggleProps()}>
        <div className="title">{props.title}</div>
        <div className="icon">
          <i
            className={"fas fa-chevron-circle-" + (isExpanded ? "up" : "down")}
          ></i>
        </div>
      </div>
      <div {...getCollapseProps()}>
        <div className="content">{props.children}</div>
      </div>
    </div>
  );
}
function App() {
  return (
    <div className="preferences">
      <Section title="Personal time off request">
        <label>
          <input type="checkbox" /> Due date: N/A
        </label>
        <br />
      </Section>
      <Section title="To do 2">
        <label>
          <input type="checkbox" /> Due date: N/A
        </label>
      </Section>
      <Section title="To do 3" collapsedHeight="32"></Section>
    </div>
  );
}
export default App;
