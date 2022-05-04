import React from "react";
import "../styles/Header.css";
import logo from "../images/ukglogo.png";

/*
 * Does log out with fetch authentication
 * Redirects window upon logout
 */
const Header = (props) => {

  const fields = ['category', 'title', 'date_created', 'date_due', 'progress']
  const clickLogout = (e) => {
    e.preventDefault();

    fetch('/api/logout', {
      method: 'DELETE'
    }).then((res) => {
      window.location.href = '/';
    })
      .catch(e => { throw e; });
  };

  //Header with logo and search bar
  return (
    <div className="header">
      <nav>
        <div className="header-left">
          <div id="header-title">
            <img src={logo} alt="UKG Logo" />
          </div>
        </div>
        <div className="search-container">
          <form action="/home">
            <input onChange={props.handler} className="search" type="text" placeholder="Search" />
            <button type="submit" class="search-button"><i class="fa fa-search"></i></button>
          </form>
        </div>
        <div className="dropdown">
            <button className="dropbtn">Sort</button>

          <div className="dropdown-content">
            {fields.map(e => {
              return (
                  <a onClick={() => props.sorter(e)}>{e}</a>
              )
            })}
          </div>
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
