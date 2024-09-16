import React, { useState, useEffect } from "react";
import "./MovieApp.css";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        {
          params: {
            api_key: "cf73124a036fd46bb410dc6d980da1f0",
          },
        }
      );
      setGenres(response.data.genres);
      // console.log(response.data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie",
        {
          params: {
            api_key: "cf73124a036fd46bb410dc6d980da1f0",
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery,
          },
        }
      );
      setMovies(response.data.results);
      console.log(response.data.results);
    };
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/search/movie",
      {
        params: {
          api_key: "cf73124a036fd46bb410dc6d980da1f0",
          query: searchQuery,
        },
      }
    );
    setMovies(response.data.results);
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

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
      <div className="filters">
        <label htmlFor="sort-by">Sort By:</label>
        <select id="sort-by" value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.asc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>

        <label htmlFor="genre">Genre:</label>
        <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => {
            return <option key={genre.id} value={genre.id} style={{ color: "black" }}>
              {genre.name}
            </option>;
          })}
        </select>
      </div>
    </div>
  );
}

export default MovieApp;
