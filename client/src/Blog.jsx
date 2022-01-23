import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
//components
import Tags from "./components/Tags";
//images
import ava from "./images/avatar_man.png";

import http, { getImageURL, reqUserById, reqBlogById } from "./services.js";

//context
import { Authorization } from "./App";

export default function Blog({ props }) {
  const authorizedUser = useContext(Authorization);
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState(null);

  //repeats
  async function likeBlog(id) {
    try {
      const { data } = await http.get(`/api/blog/${id}/like`);
      if (data.success) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.error(error);
    }
    return this;
  }

  useEffect(() => {
    reqBlogById(props.match.params.id).then((blog) => {
      setBlog(blog);
      reqUserById(blog.author).then((author) => setAuthor(author));
    });
  }, [props.match.params.id]);

  function BlogImages() {
    return (
      blog.images.length && (
        <>
          <h2 className="blog-subtitle">Images from travel</h2>
          <div
            className="blog-gallery"
            style={{
              gridTemplateRows: "1fr",
              gridTemplateColumns: "1fr ",
            }}
          >
            {blog.images.map((image) => (
              <div
                className="blog-img"
                style={{
                  backgroundImage: `url(${getImageURL(image)})`,
                }}
                key={image}
              ></div>
            ))}
          </div>
        </>
      )
    );
  }

  //comments component
  function BlogComment() {
    const [commentBody, setCommentBody] = useState("");
    const id = blog._id;

    async function postComment(e) {
      e.preventDefault();
      const { data } = await http.post(`/api/blog/${id}/comment`, {
        commentBody,
      });
      if (data.success) {
        setBlog(data.blog);
        setCommentBody("");
      }
    }

    function Comment({ comment }) {
      const [avatar, setAvatar] = useState("");
      const [name, setName] = useState("");

      useEffect(() => {
        reqUserById(comment.user).then((user) => {
          setAvatar(user.ava);
          setName(user.name);
        });
      }, [comment.user]);

      return (
        <div className="comments-item">
          <div>
            <div
              className="comments-ava"
              style={{ backgroundImage: `url(${avatar ? getImageURL(avatar) : ava})` }}
            ></div>
            <div className="comments-name">
              <Link to={""}>{name}</Link>
            </div>
          </div>
          <div className="comments-body">
            <p className="comments-text">{comment.body}</p>
          </div>
          <span className="comments-btn">Reply</span>
        </div>
      );
    }

    function CommentList() {
      return (
        <div className="comments">
          {blog.comments.map((comment, i) => (
            <Comment key={i} comment={comment} />
          ))}
        </div>
      );
    }

    return (
      <>
        {authorizedUser._id && (
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

        <h2 className="comments-title">
          {blog.comments.length ? "Comments:" : "No comments yet..."}
        </h2>

        <CommentList />
      </>
    );
  }

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
            <BlogImages />
            <div className="blog-cred">
              <h2 className="blog-price">
                Money spent: <span>350$</span>
              </h2>
              <h2 className="blog-author">
                Posted by
                <Link to={`/user/${blog.author}`}>{author.name}</Link>
              </h2>
            </div>
            <Tags tags={blog.tags} />
            <div className="blog-info">
              <div className="blog-options">
                {author && authorizedUser._id === author._id && (
                  <Link
                    to={`/blog/editor/${blog._id}`}
                    className="blog-options-link"
                  >
                    <i className="fas fa-edit"></i>
                    Edit
                  </Link>
                )}
              </div>
              <button
                onClick={() => likeBlog(blog._id)}
                className="blog-rating"
              >
                <i className="fas fa-thumbs-up"></i>
                {blog.likes.length}
              </button>
            </div>
            <BlogComment />
          </div>
        )}
      </div>
    </section>
  );
}
