import React from 'react'
import { Link } from 'react-router-dom'
export default function Aside() {
    return (
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
    )
}
