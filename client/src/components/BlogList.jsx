import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
//images
import ava from "../images/avatar_man.png";
//components
import Tags from "./Tags";

//http
import { getImageURL, reqUserById } from "../services.js";

export default function BlogList({ blogs, toggleTagSearch }) {
  function BlogItem({ blog }) {
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState("");

    //requests
    useEffect(() => {
      reqUserById(blog.author)
        .then((user) => {
          setAvatar(user.ava);
          setName(user.name);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [blog.author]);

    const symbolsToShow = 140;

    return (
      <div className="travel-item list-item">
        {/* image */}
        <div
          className="travel-item-img"
          style={{
            backgroundImage: `url(${getImageURL(blog.images[0])})`,
          }}
        >
          <div className="travel-item-type">Cheap</div>
        </div>

        {/* content */}
        <div className="travel-item-content">
          <Link className="travel-item-inner" to={`/user/${blog.author}`}>
            <div className="travel-item-user">
              <div
                className="travel-item-author-ava"
                style={{
                  backgroundImage: `url(${avatar ? getImageURL(avatar) : ava}`,
                }}
              ></div>
              <span className="travel-item-author-name">{name}</span>
            </div>
          </Link>

          <Link className="travel-item-inner" to={`/blog/${blog._id}`}>
            <h4 className="travel-item-title">{blog.title}</h4>
          </Link>

          <p className="travel-item-text">
            {blog.body.slice(0, symbolsToShow)}...
          </p>

          <span className="travel-item-tags-hashtag">#</span>

          <Tags tags={blog.tags} toggleTagSearch={toggleTagSearch} />

          <span className="travel-item-time">
            {moment(blog.createdAt).fromNow()}
          </span>
        </div>

        {/* stats */}
        <div className="travel-item-info">
          <span className="travel-item-like">
            <i className="far fa-heart"></i>
            {blog.likes.length}
          </span>
          <span className="travel-item-comment">
            <i className="fas fa-comment-dots"></i>
            {blog.comments.length}
          </span>
          <span className="travel-item-book">
            <i className="far fa-bookmark"></i>
          </span>
        </div>
      </div>
    );
  }

  // list
  return blogs ? (
    <div className="list">
      {blogs.map((blog, i) => (
        <BlogItem key={i} blog={blog} toggleTagSearch={toggleTagSearch} />
      ))}
    </div>
  ) : (
    <h3 className="list-warning">No blogs was found</h3>
  );
}
