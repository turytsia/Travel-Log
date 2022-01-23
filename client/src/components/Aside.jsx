import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

//components
import Tags from "./Tags";

export default function Aside({ blogs, tags, toggleTagSearch }) {
  const textToShow = 50;
  const blogsToShow = 3;

  function Blog({ blog }) {
    return (
      <Link to={`/blog/${blog._id}`} className="aside-list-item">
        <h4 className="aside-list-title">{blog.title}</h4>
        <span className="aside-list-item-text">
          {blog.body.slice(0, textToShow)}
        </span>
        <span className="aside-list-item-btn">
          {moment(blog.createdAt).fromNow()}
        </span>
        <div className="aside-list-item-info">
          <i className="fas fa-heart"></i>
          {blog.likes.length}
          <i className="fas fa-comment-dots"></i>
          {blog.comments.length}
        </div>
      </Link>
    );
  }

  function List() {
    return blogs ? (
      blogs
        .slice(0, blogsToShow)
        .map((blog) => <Blog blog={blog} key={blog._id} />)
    ) : (
      <span className="aside-warning">No posts yet</span>
    );
  }

  return (
    <aside className="aside">
      <div className="aside-section">
        <h3 className="aside-title">New & Hot</h3>
        <div className="aside-list">
          <List />
        </div>
      </div>
      <h3 className="aside-title">Tags</h3>
      <div className="aside-section">
        <Tags tags={tags} toggleTagSearch={toggleTagSearch} />
      </div>
      <div className="aside-support">
        <Link to="/">Help & Support</Link>
      </div>
    </aside>
  );
}
