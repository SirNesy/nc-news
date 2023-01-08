import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/User";
import { getUsers } from "../utills/api";

function Users() {
  const [users, setUsers] = useState([]);
  const { setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((result) => {
      setUsers(result);
      setLoading(false);
    });
  }, []);
  return loading ? (
    <h2> Loading</h2>
  ) : (
    <div>
      <ul className="user-list">
        {users.map((user) => {
          return (
            <li className="user" key={user.username}>
              <div className="user-name-details">
                <h3> {user.username} </h3>
                <p> {user.name}</p>
                <img
                  id="avatar-img"
                  src={user.avatar_url}
                  alt="user identity"
                />
              </div>
              <button id="user-login" onClick={() => setUser(user)}>
                Login
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Users;
