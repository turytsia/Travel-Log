import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Authorization } from "./App";

//images
import ava from "./images/avatar_man.png";
//components
import BlogList from "./components/BlogList";

import http, { reqUserById, reqBlogs, getImageURL } from "./services.js";

export default function Profile({ props }) {
  const authorizedUser = useContext(Authorization);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(null);

  const history = useHistory();

  function signOut() {
    http
      .get(`/api/auth/logout`)
      .then(({ data }) => {
        console.log(data);
        history.push("/");
      })
      .catch((error) => console.error(error));
  }

  function followUser(id) {
    http
      .get(`/api/auth/${id}/follow`)
      .then(({ data }) => setUser(data.user))
      .catch((error) => console.error(error.message));
  }
  useEffect(() => {
    reqUserById(props.match.params.id).then((user) => {
      setUser(user);
      reqBlogs().then((data) => {
        setBlogs(
          data.blogs.filter((blog) => blog.author === user._id)
        );
      });
    });

  }, [props.match.params.id, authorizedUser]);
  return (
    <>
      {user && (
        <section className="profile">
          <div className="profile-inner">
            <div
              className="profile-ava"
              style={{
                backgroundImage: `url(${
                  user.ava ? `${getImageURL(user.ava)})` : ava
                }`,
              }}
            ></div>
            <div className="profile-name">
              <span>{user.name}</span>
            </div>
            {user.bio && (
              <div className="profile-bio">
                <span>{user.bio}</span>
              </div>
            )}
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
              {authorizedUser._id !== user._id ? (
                <>
                <h3
                  onClick={() => followUser(user._id)}
                  className="profile-actions-unfollow-btn"
                >
                  {user.followers.includes(authorizedUser._id)
                    ? "Unfollow"
                    : "Follow"}
                </h3>
              </>
              ) : (
                <>
                  <Link
                    to={`/user/${authorizedUser._id}/settings`}
                    className="profile-actions-settings-btn"
                  >
                    Account Settings
                    <i className="fas fa-cog"></i>
                  </Link>
                  <h3
                    onClick={() => signOut()}
                    className="profile-actions-logout"
                  >
                    <i className="fas fa-sign-out-alt"></i>
                  </h3>
                </>
              )}
            </div>
            <div className="profile-options">
              <Link to={"/user/editor"} className="profile-option">
                <i className="fas fa-pencil-alt"></i>
                Write a Story!
              </Link>
            </div>

            <div className="profile-list">
              <div className="profile-list-inner">
                {blogs && <BlogList blogs={blogs} />}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
