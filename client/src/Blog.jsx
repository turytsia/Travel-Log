import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
//comps
import Aside from "./components/Aside";
import ava from "./images/avatar_man.png";
import http from "./services.js";
//context
import { Authorization } from "./App";
export default function Blog({ props }) {
  const authorizedUserContext = useContext(Authorization);
  const [authorizedUser, setAuthorizedUser] = useState(null);
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);
  const [commentBody, setCommentBody] = useState("");
  function getBlog() {
    const id = props.match.params.id;
    if (authorizedUserContext) setAuthorizedUser(authorizedUserContext);
    http
      .get(`/api/blog/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
        http
          .get(`/api/auth/${res.data.blog.author}`)
          .then((res) => {
            setAuthor(res.data.user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  async function likeBlog() {
    const id = props.match.params.id;
    const { data } = await http.get(
      `/api/blog/${id}/like`
    );
    if (data.success) {
      setBlog(data.blog);
    }
  }

  async function postComment(e) {
    e.preventDefault();
    const id = props.match.params.id;
    const { data } = await http.post(
      `/api/blog/${id}/comment`,
      { commentBody }
    );
    if (data.success) {
      setBlog(data.blog);
      setCommentBody("");
    }
  }

  useEffect(() => {
    getBlog();
  }, [authorizedUserContext]);
  return (
    <section className="blog">
      <div className="main-wrapper">
        {blog && author && (
          <div className="blog-content">
            <div className="blog-head">
              <h1 className="blog-title">{blog.title}</h1>
              <div className="blog-type">Cheap</div>
            </div>
            <pre className="blog-text">{blog.body}</pre>
            <h2 className="blog-subtitle">Images from travel</h2>
            <div className="blog-gallery">
              {blog.images.map((image) => (
                <div
                  className="blog-img"
                  key={image}
                  style={{
                    backgroundImage: `url(/api/image/${image})`,
                  }}
                ></div>
              ))}
            </div>
            <div className="blog-cred">
              <h2 className="blog-price">
                Money spent: <span>350$</span>
              </h2>
              <h2 className="blog-author">
                Written by
                <Link to={`/user/${blog.author}`}>{author.name}</Link>
              </h2>
            </div>
            <div className="blog-tags">
              {blog.tags &&
                blog.tags.map((tag, idx) => (
                  <Link to={""} key={idx} className="tag-item">
                    {tag}
                  </Link>
                ))}
            </div>
            <div className="blog-info">
              <div className="blog-options">
                {(authorizedUser._id === author._id && (
                  <Link
                    to={`/blog/editor/${blog._id}`}
                    className="blog-options-link"
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </Link>
                ))}
              </div>
              <button onClick={() => likeBlog()} className="blog-rating">
                <i className="fas fa-thumbs-up"></i>
                {blog.likes}
              </button>
            </div>

            {authorizedUser && (
              <form onSubmit={(e) => postComment(e)} className="blog-review">
                <h2 className="blog-review-title">
                  {authorizedUser.name}, what do you think of this Blog?
                </h2>
                <textarea
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  className="blog-review-textarea"
                  placeholder="This blog was ..."
                ></textarea>
                <button type="submit" className="blog-review-btn">
                  Send
                </button>
              </form>
            )}

            {blog.comments.length > 0 ? (
              <h2 className="comments-title">Comments:</h2>
            ) : (
              <h2 className="comments-warning">No comments yet...</h2>
            )}
            {blog.comments.map((comment, i) => (
              <div key={i} className="comments">
                <div className="comments-item">
                  <div>
                    <div
                      className="comments-ava"
                      style={{ backgroundImage: `url(${ava})` }}
                    ></div>
                    <div className="comments-name">
                      <Link to={""}>{comment.user.name}</Link>
                    </div>
                  </div>
                  <div className="comments-body">
                    <p className="comments-text">{comment.body}</p>
                  </div>
                  <span className="comments-btn">Reply</span>
                </div>
              </div>
            ))}
          </div>
        )}
        <Aside />
      </div>
    </section>
  );
}
