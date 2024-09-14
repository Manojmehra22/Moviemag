import React, { useState } from "react";
import "./MovieApp.css";
import { AiOutlineSearch } from "react-icons/ai";

function MovieApp() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {};

  return (
    <div>
      <h1>MovieMag</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Movies..."
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="search-button" onClick={handleSearchSubmit}>
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  );
}

export default MovieApp;
