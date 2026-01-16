import React, { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import MovieCard from "../components/MovieCard";
import Search from "../components/Search";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [useDebounceSearchTerm, setDeboundSearchTerm] = useState("");

  const navigate = useNavigate();

  useDebounce(() => setDeboundSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURI(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error("Failed to load data");
      }

      const data = await response.json();
      console.log(data);

      if (data.Response === "False") {
        setErrorMessage("Error fetching movies. Please try again later.");

        setMovieList([]);
        return;
      }

      setMovieList(data.results || []);
    } catch (error) {
      console.error(`Error message ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(useDebounceSearchTerm);
  }, [useDebounceSearchTerm]);

  return (
    <div className="wrapper">
      <header>
        <img src="../hero.png" alt="Hero Banner"></img>
        <h1>
          Find <span className="text-gradient">Movies</span> You'll Enjoy
          Without the Hassle
        </h1>
      </header>

      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <section className="all-movies">
        <h2 className="mt-[40px]">All Movies</h2>

        {isLoading ? (
          <div className="text-white">
            <Spinner />{" "}
          </div>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <ul>
            {movieList.map((movie) => (
              <li key={movie.id}
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                }}
              >
                <MovieCard key={movie.id} movie={movie} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default HomePage;
