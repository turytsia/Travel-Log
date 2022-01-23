import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Authorization } from "./App";
import ava from "./images/avatar_man.png";
//http
import http, { getImageURL } from "./services.js";
export default function ProfileSettings({ props }) {
  const authorizedUser = useContext(Authorization);
  const history = useHistory();
  const [name, setName] = useState(authorizedUser.name);
  const [bio, setBio] = useState(authorizedUser.bio);
  const [avatar, setAvatar] = useState(authorizedUser.ava);
  async function updateUser(e) {
    e.preventDefault();
    const id = props.match.params.id;
    const fd = new FormData();
    fd.append("name", name);
    fd.append("image", avatar || "");
    fd.append("bio", bio);
    const { data } = await http.patch(`/api/auth/${id}/update`, fd);
    history.push(`/user/${authorizedUser._id}`);
  }
  useEffect(() => {
    http.get("/api/private").then(({ data }) => {
      setName(data.name);
      setBio(data.bio || "");
      setAvatar(data.ava);
    });
  }, []);
  return (
    <>
      {authorizedUser && (
        <section className="profile-settings">
          <div className="wrapper">
            <div className="profile-settings-inner">
              <h3>Profile Settings</h3>
              <form
                onSubmit={(e) => updateUser(e)}
                className="profile-settings-form"
              >
                <div
                  className="profile-settings-ava"
                  style={{
                    backgroundImage: `url(${
                      authorizedUser.ava ? getImageURL(authorizedUser.ava) : ava
                    }`,
                  }}
                >
                  <input
                    className="profile-settings-ava-input"
                    name="image"
                    type="file"
                    onChange={(e) => setAvatar(e.target.files[0])}
                  />
                </div>
                <div className="profile-settings-item">
                  <h4>Your name</h4>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <h4>Bio</h4>
                  <input
                    type="text"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <div className="profile-settings-btn">
                    <button type="submit">Save</button>
                    <Link to={`/user/${authorizedUser._id}`}>Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
