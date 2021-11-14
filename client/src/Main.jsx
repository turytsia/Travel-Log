import React, { useEffect, useState } from "react";
//components
import Aside from "./components/Aside";
import BlogItem from "./components/BlogItem";

export default function Main({ blogs, props }) {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(blogs);
  useEffect(() => {
    const query = props.location.search;
    const sq = new URLSearchParams(query);
    setSearchResult(
      blogs.filter((blog) => {
        if (search) return blog.title.toLowerCase().includes(search);
        return sq.get("tag")
          ? blog.tags.map((tag) => tag.toLowerCase()).includes(sq.get("tag"))
          : blog;
      })
    );
  }, [search, blogs, props.location.search]);
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
