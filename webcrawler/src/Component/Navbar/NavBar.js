import React from "react";
import { Link } from "react-router-dom";

// NAVIGATION BAR
const Navbar = () => {
  return (
    <>
      <div className="mainNav">
        <Link to="/">
          <div className="mainNavLeft">
          <img
            className="logo"
            src="https://img.freepik.com/premium-vector/breaking-news-design_24877-38203.jpg"
            alt="News Logo"
          />
          <h1>TIMES OF INDIA</h1>
          </div>
        </Link>
        <Link to="/save">
          <p className="navSavedNews mainNavRight">Saved News</p>
        </Link>
      </div>
    </>
  );
};

export default Navbar;
