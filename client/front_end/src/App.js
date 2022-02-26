import React from "react";
import "./App.css";
import Section from "./component/collapsible_list";

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
