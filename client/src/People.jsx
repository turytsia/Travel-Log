import React from "react";
import { Link } from "react-router-dom";
import ava from "./images/avatar_man.png";
export default function People() {
  return (
    <section className="people">
      <div className="people-inner">
        <form className="main-search">
          <h2>Search for people...</h2>
          <div className="main-input">
            <input type="text" placeholder="Vincent ..." />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>
        <div className="people-list">
          <Link to="/" className="people-item">
            <div className="people-item-inner">
              <div
                className="people-item-ava"
                style={{ backgroundImage: `url(${ava})` }}
              ></div>
              <div className="people-item-content">
                <h3 className="people-item-username">John Wick</h3>
                <span className="people-item-followers">
                  <i className="fas fa-users"></i>
                  228
                </span>
              </div>
              <button className="people-item-btn">Follow</button>
            </div>
          </Link>
          <Link to="/" className="people-item">
            <div className="people-item-inner">
              <div
                className="people-item-ava"
                style={{ backgroundImage: `url(${ava})` }}
              ></div>
              <div className="people-item-content">
                <h3 className="people-item-username">John Wick</h3>
                <span className="people-item-followers">
                  <i className="fas fa-users"></i>
                  228
                </span>
              </div>
              <button className="people-item-btn">Follow</button>
            </div>
          </Link>
          <Link to="/" className="people-item">
            <div className="people-item-inner">
              <div
                className="people-item-ava"
                style={{ backgroundImage: `url(${ava})` }}
              ></div>
              <div className="people-item-content">
                <h3 className="people-item-username">John Wick</h3>
                <span className="people-item-followers">
                  <i className="fas fa-users"></i>
                  228
                </span>
              </div>
              <button className="people-item-btn">Follow</button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
