import React from "react";
import ava from "./images/avatar_man.png";
import { Link } from "react-router-dom";
import exm1 from "../src/images/exm1.jpg";
export default function Profile() {
  return (
    <section className="profile">
      <div className="profile-inner">
        <div
          className="profile-ava"
          style={{ backgroundImage: `url(${ava})` }}
        ></div>
        <div className="profile-name">
          <span>Some Name</span>
        </div>
        <div className="profile-bio">
          <span>My name is, This is my bio!!!</span>
        </div>
        <div className="profile-stats">
          <div className="profile-followers">
            <i class="fas fa-hiking"></i>
            435 Followers
          </div>
          <div className="profile-subs">
            <i className="fas fa-users"></i>
            124 following
          </div>
        </div>
        <div className="profile-actions">
          <h3>Subscribe</h3>
        </div>
        <div className="profile-options">
          <div className="profile-options-add">
            <i className="fas fa-pencil-alt"></i>
            Write a Story!
          </div>
          <div className="profile-options-settings">
            <i className="fas fa-cog"></i>
            Account
          </div>
        </div>
        
        <div className="profile-list">
          <div className="profile-list-inner">
            <div
              className="travel-item"
              style={{ backgroundImage: `url(${exm1})` }}
            >
              <Link className="travel-item-inner" to={""}>
                <h4 className="travel-item-title">Rest on the Beach!</h4>
                <pre className="travel-item-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                  temporibus facere aliquam animi voluptates unde adipisci
                  tempora facilis ad. Libero recusandae porro maiore...
                </pre>
                <h5 className="travel-item-author">by Author2</h5>
              </Link>
              <div className="travel-item-info">
                <span className="travel-item-like">
                  <i className="far fa-heart"></i>
                  32
                </span>
                <span className="travel-item-comment">
                  <i className="fas fa-comment-dots"></i>5
                </span>
                <span className="travel-item-save">
                  <i className="far fa-bookmark"></i>
                  14
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
