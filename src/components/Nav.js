import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

function Nav() {
  const { user } = useContext(UserContext);

  return (
    <div className="nav-bar">
      <span className="user-name"> {user.username}</span>
      <Link to={"/"}>Home</Link>
      <Link to={"/topics/:topic"}> Topics</Link>
      <Link to={"/users"}> Login</Link>
    </div>
  );
}

export default Nav;
