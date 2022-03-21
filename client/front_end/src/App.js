import React from "react";
import './index.css'
import Navbar from './Navbar.js'
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import ToolBar from "./ToolBar";
import Sidebar from "./Sidebar";
import Section from "./components/collapsible_list";
import {Route, BrowserRouter as Routes, BrowserRouter, Switch} from "react-router-dom";
import NewItem from "./NewItem"
import Home from "./Home"
import Settings from "./Settings";

const App=()=>{
  return (
    
    <BrowserRouter>
    <Routes>

      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/create-item" component={NewItem}/>
        <Route path="/settings" component={Settings}/>
      </Switch>

    </Routes>
    </BrowserRouter>

  )
}
export default App;
