import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
function Price() {
  return <div className="travel-item-type">Cheap</div>;
}
export default function BlogItem({ blog }) {
  return (
    <div className="travel-item list-item">
      <div
        className="travel-item-img"
        style={{
          backgroundImage: `url(https://algorithammer.herokuapp.com/api/image/${blog.images[0]})`,
        }}
      >
        <Price />
      </div>
      <Link className="travel-item-inner" to={`/blog/${blog._id}`}>
        <h4 className="travel-item-title">
          <span>{blog.title}</span>
          <span className="travel-item-time">
            {" "}
            {moment(blog.createdAt).fromNow()}
          </span>
        </h4>
        <p className="travel-item-text">{blog.body.slice(0, 140)}...</p>
      </Link>
      <div className="travel-item-tags">
        {blog.tags.map((tag, i) => (
          <Link to={`/?tag=${tag}`} key={i} className="tag-item">
            {tag}
          </Link>
        ))}
      </div>
      <div className="travel-item-info">
        <span className="travel-item-comment">
          <i className="fas fa-comment-dots"></i>
          {blog.comments.length}
        </span>
        <span className="travel-item-like">
          <i className="far fa-heart"></i>
          {blog.likes}
        </span>
      </div>
    </div>
  );
}
