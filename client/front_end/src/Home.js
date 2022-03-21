import React from "react";
import './index.css'
import Navbar from './Navbar.js'
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import ToolBar from "./ToolBar";
import Sidebar from "./Sidebar";
import Section from "./component/collapsible_list";

export default function Home() {
    return (
        <div>
        <ToolBar/>
        <Sidebar/>
        <Navbar/>
        <Section title="Personal time off request">
          <label>
            <input type="checkbox" /> Due date: N/A
          </label>
          <br />
        </Section>
    </div>
    );
}

