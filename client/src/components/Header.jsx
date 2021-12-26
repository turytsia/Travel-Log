import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import background from "../images/back.jpg";

import { Authorization } from "../App";

export default function Header() {
  function moveBackground(e) {
    let wall = document.getElementById("wall");
    let nav = document.getElementById("nav");
    let link = document.getElementsByClassName("header-link");
    let ico = document.getElementById("user_ico");

    if(!wall) return;

    wall.style.transform = `translateY(${window.pageYOffset / 10}%)`;
    if (window.pageYOffset > 0) {
      nav.style.backgroundColor = "#fff";
      for (let item of link) {
        item.style.color = "#000";
        nav.style.borderBottom = "1px solid #000";
        if (ico) ico.style.color = "#000";
      }
    } else {
      nav.style.backgroundColor = "transparent";
      for (let item of link) {
        item.style.color = "#fff";
        nav.style.borderBottom = "none";
      }
      if (ico) ico.style.color = "#fff";
    }
  }

  const isAuthorized = useContext(Authorization);

  useEffect(() => {
    window.addEventListener("scroll", (e) => moveBackground(e));
    return () => {
      window.removeEventListener("scroll", moveBackground);
    };
  });

  return (
    <>
      <div className="header-nav" id="nav">
        <div className="wrapper">
          <Link className="header-link" to={"/"}>
            Travel Log
          </Link>
          <div className="header-options">
            <Link className="header-link" to={"/"}>
              Popular
            </Link>
            <Link className="header-link" to={"/people"}>
              People
            </Link>
            {isAuthorized ? (
              <Link to={`/user/${isAuthorized._id}`}>
                <i id="user_ico" className="fas fa-user"></i>
              </Link>
            ) : (
              <Link className="header-link" to={"/auth/register"}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      <header className="header">
        <div
          id="wall"
          className="header-outer"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="wrapper">
            <div className="header-info">
              <span className="header-info-text">Share. Travel. Explore.</span>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
