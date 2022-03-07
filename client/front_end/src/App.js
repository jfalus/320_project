import Header from "./components/Header";
import Section from "./components/Collapsible_list";
import Sidebar from "./components/Sidebar";
import "./index.css";
function App() {
  const styles = {
    contentDiv: {
      display: "flex",
    },
    contentMargin: {
      marginLeft: "0px",
      width: "100%",
      backgroundColor: "005151",
    },
  };
  return (
    <>
      <Header />
      <div style={styles.contentDiv}>
        <Sidebar />
        <div className="Main-section">
          <Section
            sender="UMass Amherst Libraries"
            subject="Undergraduate Sustainability Award"
            content="The Undergraduate Sustainability Award promotes"
          />
          <Section sender="John Doe" subject="Test 2" content="dsvdsa" />
        </div>
      </div>
    </>
  );
import React from "react";
import './index.css'
import Navbar from './Navbar.js'
import logo from "./logo.svg";
import "./App.css";
import "./style.css";
import ToolBar from "./ToolBar";
import Sidebar from "./Sidebar";
import Section from "./component/collapsible_list";

const App=()=>{
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
  )
}
export default App;
