import React from "react";
import "../styles/Header.css";
import logo from "../images/ukglogo.png";

const Header = () => {
  return (
    <div className="header">
      <nav>
        <div className="header-left">
          <div id="header-title">
            <img src={logo} alt="UKG Logo" />
          </div>
        </div>
        <div className="searchbar">
          <input className="search" type="text" placeholder="search" />
        </div>
        <div className="sortby">
          <p>sort by</p>
        </div>
      </nav>
    </div>
  );
};

export default Header;
