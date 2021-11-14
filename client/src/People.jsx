import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ava from "./images/avatar_man.png";
//components
import Aside from "./components/Aside";
//http
import http from "./services.js";
//context
import { Authorization } from "./App";

function User({ user }) {
  const authorizedUser = useContext(Authorization);
  const [isSubscribed, setSubscribed] = useState(false);
  async function followUser(id) {
    const { data } = await http.get(
      `http://localhost:5000/api/auth/${id}/follow`
    );
    if (data.success) setSubscribed(!isSubscribed);
  }

  return (
    <div className="people-item list-item">
      <div className="people-item-inner">
        <div
          className="people-item-ava"
          style={{
            backgroundImage: `url(${
              user.ava ? `/api/image/${user.ava})` : ava
            }`,
          }}
        ></div>
        <Link to={`/user/${user._id}`} className="people-item-content">
          <h3 className="people-item-username">{user.name}</h3>
          <span className="people-item-followers">
            <i className="fas fa-users"></i>
            {user.followers.length}
          </span>
        </Link>
        <button
          onClick={() => followUser(user._id)}
          className="people-item-btn"
        >
          {(authorizedUser && authorizedUser.following.includes(user._id)) ||
          isSubscribed ? (
            <i className="fas fa-user-check"></i>
          ) : (
            <i className="fas fa-user-plus"></i>
          )}
        </button>
      </div>
    </div>
  );
}
export default function People() {
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  async function getUsers() {
    const { data } = await http.get("/api/auth/all");
    if (data.success) setUsers(data.users);
  }
  useEffect(() => {
    getUsers();
    if (users)
      setSearchResult(
        users.filter((user) => user.name.toLowerCase().includes(search))
      );
  }, [search]);
  return (
    <section className="people">
      <div className="people-inner">
        <form className="main-search">
          <h2>Search for people</h2>
          <div className="main-input-outer">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="main-input"
              type="text"
              placeholder="Vincent..."
            />
          </div>
        </form>
        <div className="main-wrapper">
          <div className="list">
            {users && searchResult.length ? (
              searchResult.map((user, i) => <User key={i} user={user} />)
            ) : (
              <span className="list-warning">No results</span>
            )}
          </div>
          <Aside />
        </div>
      </div>
    </section>
  );
}
