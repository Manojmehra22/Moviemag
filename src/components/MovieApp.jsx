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
  const [expandedMovieId, setExpandedMovieId] = useState(null);

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

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  return (
    <>
      <div className="breakpoint">
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
          <label htmlFor="sort-by" className="sort-heading">
            Sort By:
          </label>
          <select id="sort-by" value={sortBy} onChange={handleSortChange}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.asc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </select>

          <label htmlFor="genre" className="genreheading">
            Genre:
          </label>
          <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => {
              return (
                <option
                  key={genre.id}
                  value={genre.id}
                  style={{ color: "black" }}
                >
                  {genre.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      <div className="movie-wrapper">
        {movies.map((movie) => {
          return (
            <div key={movie.id} className="movie">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h2>{movie.title}</h2>
              <p className="rating">Rating:{movie.vote_average}</p>
              {expandedMovieId === movie.id ? (
                <p>{movie.overview}</p>
              ) : (
                <p>{movie.overview.substring(0, 150)}...</p>
              )}
              <button
                onClick={() => {
                  toggleDescription(movie.id);
                }}
                className="read-more"
              >
                {expandedMovieId === movie.id ? "Show Less" : "Read More"}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MovieApp;
