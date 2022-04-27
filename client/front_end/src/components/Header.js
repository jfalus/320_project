import React from "react";
import "../styles/Header.css";
import logo from "../images/ukglogo.png";

const Header = (props) => {

  const clickLogout = (e) => {
    e.preventDefault();

    fetch('/api/logout', {
      method: 'DELETE'
    }).then((res) => {
      window.location.href = '/';
    })
      .catch(e => { throw e; });
  };

  return (
    <div className="header">
      <nav>
        <div className="header-left">
          <div id="header-title">
            <img src={logo} alt="UKG Logo" />
          </div>
        </div>
        <div class="search-container">
          <form action="/home">
            <input onChange={props.handler} className="search" type="text" placeholder="Search" />
            <button type="submit" class="search-button"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <div sortby-container>
          <form action="/home">
            <button class="sortby">Sort</button>
          </form>
        </div>
        <div logout>
          <button
            id="logout-button"
            onClick={clickLogout}
          >
            Log Out
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;