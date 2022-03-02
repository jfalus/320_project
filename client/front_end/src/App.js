<<<<<<< HEAD
import React from "react";
import "./App.css";
import Section from "./component/collapsible_list";
=======
import logo from './logo.svg';
import './App.css';
import './style.css';
import ToolBar from './ToolBar';
import Sidebar from './Sidebar';
import React, { useEffect, useState } from "react";
>>>>>>> 027b6b325f07b1dc9b952b0ac2827307e6f44977

function App() {

const[sidebar, setSidebar]= useState(false);

const toggleSidebar=()=> {
  setSidebar((prevState)=> !prevState)
}

  return (
<<<<<<< HEAD
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
=======
    <div>
      <ToolBar openSidebar={toggleSidebar}/>
      <Sidebar sidebar={sidebar}/>
    </div>
  );
}

export default App;
>>>>>>> 027b6b325f07b1dc9b952b0ac2827307e6f44977
