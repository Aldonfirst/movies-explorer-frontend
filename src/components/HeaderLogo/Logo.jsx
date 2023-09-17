
import { Link } from "react-router-dom";
import React from "react";
import "./Logo.css"

function Logo({ setIsLoggedIn }) {
  const handleClick = () => {
    setIsLoggedIn(prev => !prev);
  };

  return (
    <Link className="logo" to="/" onClick={handleClick}></Link>
  );
}

export default Logo;