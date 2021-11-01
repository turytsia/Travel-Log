import React, { useContext, useEffect, useState } from "react";
import ava from "./images/avatar_man.png";
import { Link, useHistory } from "react-router-dom";
import { Authorization } from "./App";
import http from "./services.js";

//components
import BlogItem from "./components/BlogItem";

export default function Profile({ props }) {
  const authorizedUserContext = useContext(Authorization);
  const [user, setUser] = useState(null);
  const [authorizedUser, setAuthorizedUser] = useState({ _id: null });
  const [blogs, setBlogs] = useState(null);

  const history = useHistory();

  async function signOut() {
    const { data } = await http.get("http://localhost:5000/api/auth/logout");
    history.push("/");
  }
  async function getAuthorizedUser() {
    const { data } = await http.get("http://localhost:5000/api/private");
    if (data.success) setAuthorizedUser(data.user);
  }
  function getUser() {
    const id = props.match.params.id;
    http.get(`http://localhost:5000/api/auth/${id}`).then((res) => {
      setUser(res.data.user);
      const userID = res.data.user._id;
      http.get("http://localhost:5000/api/blog/all").then((res) => {
        setBlogs(res.data.blogs.filter((blog) => blog.author === userID));
        console.log(res.data.blogs);
      });
    });
  }
  async function followUser() {
    const id = props.match.params.id;
    const { data } = await http.get(
      `http://localhost:5000/api/auth/${id}/follow`
    );
    if (data.success) setUser(data.user);
  }
  useEffect(() => {
    getUser();
    if (authorizedUserContext) setAuthorizedUser(authorizedUserContext);
    else getAuthorizedUser();
  }, [props.match.params.id]);
  return (
    <>
      {user && (
        <section className="profile">
          <div className="profile-inner">
            <div
              className="profile-ava"
              style={{ backgroundImage: `url(${ava})` }}
            ></div>
            <div className="profile-name">
              <span>{user.name}</span>
            </div>
            <div className="profile-bio">
              <span>My name is, This is my bio!!!</span>
            </div>
            <div className="profile-stats">
              <div className="profile-followers">
                <i className="fas fa-hiking"></i>
                {user.followers.length} Followers
              </div>
              <div className="profile-subs">
                <i className="fas fa-users"></i>
                {user.following.length} Following
              </div>
            </div>
            <div className="profile-actions">
              {authorizedUser._id === user._id ? (
                <>
                  <h3 className="profile-actions-settings-btn">
                    Account Settings
                    <i className="fas fa-cog"></i>
                  </h3>
                  <h3
                    onClick={() => signOut()}
                    className="profile-actions-logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </h3>
                </>
              ) : (<>
                {user.followers.includes(authorizedUser._id)?<h3
                  onClick={() => followUser()}
                  className="profile-actions-unfollow-btn"
                >
                  Unfollow
                </h3>:<h3
                  onClick={() => followUser()}
                  className="profile-actions-follow-btn"
                >
                  Follow
                </h3>}
              </>)}
            </div>
            <div className="profile-options">
              <Link to={"/user/editor"} className="profile-options-add">
                <i className="fas fa-pencil-alt"></i>
                Write a Story!
              </Link>
            </div>

            <div className="profile-list">
              <div className="profile-list-inner">
                {blogs && blogs.length > 0 ? (
                  blogs.map((blog) => <BlogItem key={blog._id} blog={blog} />)
                ) : (
                  <h3 className="profile-list-warning">
                    You have posted 0 blogs...
                  </h3>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
