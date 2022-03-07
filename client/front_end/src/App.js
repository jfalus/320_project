import logo from './logo.svg';
import './App.css';
import './style.css';
import ToolBar from './ToolBar';
import Sidebar from './Sidebar';
import React from "react";
import './index.css'
import Navbar from './Navbar.js'
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import ToolBar from "./ToolBar";
import Sidebar from "./Sidebar";
import Section from "./component/collapsible_list";
import React, { useEffect, useState } from "react";

const App=()=>{
  return (
    <div>
      <ToolBar/>
      <Sidebar/>
      <Navbar/>
      <ToolBar openSidebar={toggleSidebar} />
      <Sidebar sidebar={sidebar} />
      <Section title="Personal time off request">
        <label>
          <input type="checkbox" /> Due date: N/A
        </label>
        <br />
      </Section>
    </div>
  )
}
export default App;
