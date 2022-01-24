import React, { useEffect, useState } from "react";
//components
import Aside from "./components/Aside";
import BlogList from "./components/BlogList";
import Tags from "./components/Tags";

import { reqBlogs } from "./services";

export default function Main() {
  const [blogs, setBlogs] = useState(null);
  const [tags, setTags] = useState([]);

  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(0);

  const [tagSearch, setTagSearch] = useState([]);

  const blogsPerPage = 3;

  //returns all the blogs on current page
  function getBlogs(page) {
    if (!searchResult) return [];
    return searchResult.slice(
      page * blogsPerPage,
      page * blogsPerPage + blogsPerPage
    );
  }

  //returns true if search tag is also blog's tag
  function checkTag(blog) {
    for (let i = 0; i < blog.tags.length; i++)
      if (tagSearch.includes(blog.tags[i])) return true;
    return false;
  }

  //adds and removes tag to a search list
  function toggleTagSearch(tag) {
    setTagSearch(
      tagSearch.indexOf(tag) === -1
        ? [...tagSearch, tag]
        : tagSearch.filter((t) => tag !== t)
    );
  }

  //returns sorted blogs by tags & search bar
  function searchBlog(search) {
    setSearchResult(
      search || tagSearch.length
        ? blogs.filter((blog) =>
            search ? blog.title.toLowerCase().includes(search) : checkTag(blog)
          )
        : blogs
    );
  }

  useEffect(() => {
    reqBlogs()
      .then((data) => {
        setBlogs(data.blogs);
        setSearchResult(data.blogs);
        setTags(data.tags);
        console.log("Here")
        console.log(data)
      })
      .catch((error) => console.log(error));
  }, []);

  function BlogPager() {
    if (!searchResult) return null;
    let pages = [];
    const pagesCount = searchResult.length / blogsPerPage;

    for (let i = 0; i < pagesCount; i++) {
      pages.push(i);
    }

    return (
      <div className="pager">
        {pages
          .slice(
            page === 0 ? page : page - 1,
            page === pagesCount ? page : page + 2
          )
          .map((p, i) => (
            <div
              onClick={() => setPage(p)}
              key={i}
              className={`pager-item ${p === page && "pager-item--active"}`}
            >
              {p + 1}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="main-inner">
      <form className="main-search">
        <h2>Where do you desire to go?</h2>
        <div className="main-input-outer">
          <input
            onChange={(e) => searchBlog(e.target.value)}
            className="main-input"
            type="text"
            placeholder="USA, Italy, France..."
          />
        </div>
        <div className="main-tag-container">
          <Tags tags={tagSearch} toggleTagSearch={toggleTagSearch} />
        </div>
      </form>
      <div className="main-wrapper">
        <BlogList blogs={getBlogs(page)} toggleTagSearch={toggleTagSearch} />

        <Aside
          blogs={blogs}
          tags={tags}
          tagSearch={tagSearch}
          toggleTagSearch={toggleTagSearch}
        />
      </div>
      <BlogPager />
    </div>
  );
}
