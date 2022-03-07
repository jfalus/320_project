import logo from "./../images/ukglogo.png";
import React from "react";
import "./../styles/Header.css";

const Header = () => {
  return (
    <div class="navbar">
      <div class="logo">
        <img
          class="pic"
          src="https://www.ukg.com/themes/custom/canopy_theme/app/files/images/logos/ukg_logo.svg"
        />
      </div>
      <div class="searchbar">
        <input class="search" type="text" placeholder="search" />
      </div>
      <div class="sortby">
        <p>sort by</p>
      </div>
    </div>
  );
};

export default Header;
