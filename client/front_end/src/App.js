import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import {Home} from "./pages/Home";
import NewItem from "./NewItem";
import Settings from "./Settings";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-item" element={<NewItem />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
};
export default App;
