import React from "react";
import "../styles/Header.css";
import logo from "../images/ukglogo.png";

const Header = (props) => {
  return (
    <div className="header">
      <nav>
        <div className="header-left">
          <div id="header-title">
            <img src={logo} alt="UKG Logo" />
          </div>
        </div>
        <div class="search-container">
          <form action="/home" class="form">
            <input onChange={props.handler} className="search" type="text" placeholder="search"/>
            <button type="submit" class="search-button"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <div sortby-container>
          <form action="/home">
            <button class="sortby">Sort</button>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default Header;
