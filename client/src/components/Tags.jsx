import React from "react";

export default function Tags({ tags, toggleTagSearch }) {
  function handleClick(tag) {
    if (toggleTagSearch) toggleTagSearch(tag);
  }
  return tags.length ? (
    <div className="tag-list">
      {tags.map((tag, i) => (
        <span
          onClick={() => handleClick(tag)}
          key={i}
          className="tag-list-item"
        >
          {tag}
        </span>
      ))}
    </div>
  ) : null;
}
