import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../services.js";
import moment from "moment";
export default function Aside() {
  const [blogs, setBlogs] = useState(null);
  const [tags, setTags] = useState([]);
  async function getBlogs() {
    try {
      const { data } = await http.get("https://arcane-brushlands-47211.herokuapp.com/api/blog/all");
      setBlogs(data.blogs.slice(0, 3));
      setTags(data.tags.slice(0,10));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <aside className="aside">
      <div className="aside-section">
        <h3 className="aside-title">New & Hot</h3>
        <div className="aside-list">
          {blogs && blogs.length ? (
            blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog._id}`}
                className="aside-list-item"
              >
                <h4 className="aside-list-title">{blog.title}</h4>
                <span className="aside-list-item-text">
                  {blog.body.slice(0, 50)}
                </span>
                <span className="aside-list-item-btn">
                  {moment(blog.createdAt).fromNow()}
                </span>
                <div className="aside-list-item-info">
                  <i className="fas fa-heart"></i>
                  {blog.likes}
                  <i className="fas fa-comment-dots"></i>
                  {blog.comments.length}
                </div>
              </Link>
            ))
          ) : (
            <span className="aside-warning">No posts yet</span>
          )}
        </div>
      </div>
      <div className="aside-section">
        <h3 className="aside-title">Tags</h3>
        <div className="aside-tags">
          {tags.map((tag, i) => (
            <Link to={`/?tag=${tag}`} key={i} className="tag-item">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <div className="aside-support">
        <Link to="">Help & Support</Link>
      </div>
    </aside>
  );
}
