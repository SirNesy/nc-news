import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

function Nav() {
  const { user } = useContext(UserContext);

  return (
    <div className="nav-bar">
      <span className="user-name"> {user.username}</span>
      <Link id="link" to={"/"}>
        HOME
      </Link>
      <Link id="link" to={"/topics/:topic"}>
        {" "}
        TOPICS
      </Link>
      <Link id="link" to={"/users"}>
        {" "}
        LOGIN
      </Link>
    </div>
  );
}

export default Nav;
