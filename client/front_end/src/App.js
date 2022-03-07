import logo from './logo.svg';
import './App.css';
import './index.css'
import Navbar from './Navbar.js'
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import ToolBar from "./ToolBar";
import Sidebar from "./Sidebar";
import Section from "./component/collapsible_list";
import React, { useEffect, useState } from "react";

function App() {
  const [sidebar, setSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebar((prevState) => !prevState);
  };
  return (
    <div>
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
  );
}
export default App;
