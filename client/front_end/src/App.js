import logo from './logo.svg';
import './App.css';
import './style.css';
import ToolBar from './ToolBar';
import Sidebar from './Sidebar';
import React from "react";

const App=()=>{
  return (
    <div>
      <ToolBar/>
      <Sidebar/>
    </div>
  )
}
export default App;
