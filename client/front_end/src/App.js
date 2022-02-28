import React from 'react';
import logo from './logo.svg';
import './App.css';
import './style.css';
import ToolBar from './ToolBar';
import Sidebar from './Sidebar';
import React, { useEffect, useState } from "react";

function App() {

const[sidebar, setSidebar]= useState(false);

const toggleSidebar=()=> {
  setSidebar((prevState)=> !prevState)
}

  return (
    <div>
      <ToolBar openSidebar={toggleSidebar}/>
      <Sidebar sidebar={sidebar}/>
    </div>
  );
}

export default App;