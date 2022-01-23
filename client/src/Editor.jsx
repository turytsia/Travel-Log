import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import http from "./services.js";

export default function Editor({ editMode, props }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  async function getBlog() {
    if (editMode && props) {
      const id = props.match.params.id;
      try {
        const { data } = await http.get(`/api/blog/${id}`);
        console.log(data);
        if (data.success) {
          setBody(data.blog.body);
          setTitle(data.blog.title);
          setTags(data.blog.tags);
          setImages(data.blog.images);
          setCategory(data.blog.category);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function updateBlog(e) {
    e.preventDefault();
    if (editMode && props) {
      const id = props.match.params.id;
      const { data } = await http.patch(`/api/blog/update/${id}`, {
        title,
        body,
        tags,
        category,
      });
      if (!data.success) console.error(data);
      history.push("/");
    }
  }
  async function postBlog(e) {
    e.preventDefault();
    if (!title || !body || !category || !images.length) {
      setErrorMessage("Invalid input");
      return;
    } else setErrorMessage("");
    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    for (let i = 0; i < images.length; i++) fd.append("image", images[i]);
    fd.append("category", category);
    fd.append("tags", tags);
    const { data } = await http.post(`/api/blog/create`, fd);
    history.push("/");
  }

  function createTag() {
    if (tagName) {
      setTags([...tags, tagName]);
      setTagName("");
    }
  }

  function removeTag(i) {
    const tempTags = [...tags];
    tempTags.splice(i, 1);
    setTags(tempTags);
  }
  useEffect(() => {
    getBlog();
  }, [editMode]);

  return (
    <section className="editor">
      <h2 className="editor-title">Editor</h2>
      <div className="editor-inner">
        {errorMessage && (
          <h4 className="editor-error">
            <i className="fas fa-exclamation-triangle"></i>
            {errorMessage}
          </h4>
        )}
        <form
          onSubmit={(e) => (!editMode ? postBlog(e) : updateBlog(e))}
          className="editor-form"
        >
          <div className="editor-form-wrapper">
            <h3>Title</h3>
            <input
              placeholder="Your title..."
              className="editor-input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="editor-form-wrapper">
            <h3>Body</h3>
            <textarea
              placeholder="Your story..."
              className="editor-input"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="editor-form-wrapper">
            <h3>Images</h3>
            <input
              className="editor-input"
              multiple
              name="image"
              type="file"
              onChange={(e) => setImages([...e.target.files])}
            />
          </div>
          {console.log(images)}
          {images.length?<div className="editor-form-images">
              {images.map((image) => (
               <img src={URL.createObjectURL(image)} alt = ""/>
              ))}
            </div>:null}
          <div className="editor-form-wrapper">
            <h3>Category</h3>
            <input
              placeholder="Your category..."
              className="editor-input"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="editor-form-wrapper">
            <h3>Tags</h3>
            <label htmlFor="input" className="editor-tags">
              {tags.map((tag, i) => (
                <span key={i} onClick={() => removeTag(i)} className="tag-list-item">
                  {tag}
                </span>
              ))}

              <div className="editor-tags-wrapper">
                <input
                  placeholder="Click to type more tags!"
                  value={tagName}
                  onChange={(e) => setTagName(e.target.value)}
                  className="editor-tags-input"
                  id="input"
                  type="text"
                />
                <i
                  onClick={() => createTag()}
                  className={`${tagName && "editor-tags-confirm"} fas fa-check`}
                ></i>
              </div>
            </label>
          </div>
          <button className="editor-btn">{editMode ? "Update" : "Post"}</button>
        </form>
      </div>
    </section>
  );
}
