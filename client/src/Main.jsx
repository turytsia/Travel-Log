import React, { useEffect, useState } from "react";
//components
import Aside from "./components/Aside";
import BlogItem from "./components/BlogItem";

export default function Main({ blogs }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(blogs);
  useEffect(() => {
    setSearchResult(
      blogs.filter((blog) => blog.title.toLowerCase().includes(search))
    );
  }, [search, blogs]);
  return (
    <div className="main-inner">
      <form className="main-search">
        <h2>Where do you desire to go?</h2>
        <div className="main-input-outer">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="main-input"
            type="text"
            placeholder="USA, Italy, France..."
          />
          <button className="main-search-btn">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
      <div className="main-wrapper">
        <div className="list">
          {searchResult.length ? (
            searchResult.map((blog, i) => <BlogItem key={i} blog={blog} />)
          ) : (
            <span className="list-warning">No results</span>
          )}
        </div>
        <Aside blogs={blogs} />
      </div>
    </div>
  );
}
