import React from "react";
import { Link } from "react-router-dom";
import exm1 from "../src/images/exm1.jpg";
import exm2 from "../src/images/exm2.jpg";

export default function Main() {
  return (
    <div className="main-inner">
      {/*Search components*/}
      <form className="main-search">
        <h2>Where do you desire to go?</h2>
        <div className="main-input">
          <input type="text" placeholder="USA, Italy, France..." />
          <button>
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>

      <div className="main-wrapper">
        <div className="main-popular">
          <div
            className="travel-item"
            style={{ backgroundImage: `url(${exm1})` }}
          >
            <Link className="travel-item-inner" to={""}>
              <h4 className="travel-item-title">Rest on the Beach!</h4>
              <pre className="travel-item-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                temporibus facere aliquam animi voluptates unde adipisci tempora
                facilis ad. Libero recusandae porro maiore...
              </pre>
              <h5 className="travel-item-author">by Author2</h5>
            </Link>
            <div className="travel-item-info">
              <span className="travel-item-like">
                <i class="far fa-heart"></i>
                32
              </span>
              <span className="travel-item-comment">
                <i class="fas fa-comment-dots"></i>5
              </span>
              <span className="travel-item-save">
                <i class="far fa-bookmark"></i>
                14
              </span>
            </div>
          </div>

          <div
            className="travel-item"
            style={{ backgroundImage: `url(${exm2})` }}
          >
            <Link className="travel-item-inner" to={""}>
              <h4 className="travel-item-title">Rest on the Beach!</h4>
              <pre className="travel-item-text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
                temporibus facere aliquam animi voluptates...
              </pre>
              <h5 className="travel-item-author">by Author2</h5>
            </Link>
            <div className="travel-item-info">
              <span className="travel-item-like">
                <i class="far fa-heart"></i>
                32
              </span>
              <span className="travel-item-comment">
                <i class="fas fa-comment-dots"></i>5
              </span>
              <span className="travel-item-save">
                <i class="far fa-bookmark"></i>
                14
              </span>
            </div>
          </div>
        </div>
        <aside className="main-aside">
          <div className="main-aside-section">
            <h3>Latest & new</h3>
            <div className="main-aside-section-list">
              <Link to={""} className="main-aside-section-list-item">
                <h4>Title1</h4>
                <span>by Name1</span>
              </Link>
              <Link to={""} className="main-aside-section-list-item">
                <h4>Title2</h4>
                <span>by Name2</span>
              </Link>
              <Link to={""} className="main-aside-section-list-item">
                <h4>Title3</h4>
                <span>by Name3</span>
              </Link>
            </div>
          </div>
          <div className="main-aside-section">
            <h3>Tags</h3>
            <div className="main-aside-section-tags">
              <Link to={""} className="main-aside-section-list-tag">
                Tag1
              </Link>
              <Link to={""} className="main-aside-section-list-tag">
                Tag3
              </Link>
              <Link to={""} className="main-aside-section-list-tag">
                Tag4
              </Link>
              <Link to={""} className="main-aside-section-list-tag">
                Tag5
              </Link>
              <Link to={""} className="main-aside-section-list-tag">
                Tag6
              </Link>
            </div>
          </div>
          <div className="main-aside-support">
            <Link to="">Help & Support</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
