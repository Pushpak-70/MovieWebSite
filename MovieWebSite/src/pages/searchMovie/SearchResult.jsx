import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "../../components/card/Card";
import "./SearchMovie.css";

const SearchMovie = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [input, setInput] = useState(searchTerm || "");

  useEffect(() => {
    if (searchTerm) {
      fetchSearchResults(searchTerm);
    }
  }, [searchTerm]);

  const fetchSearchResults = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setSearchResults(data.results))
      .catch((err) => console.error("Error fetching search results:", err));
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const fetchSuggestions = (query) => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${query}`
    )
      .then((res) => res.json())
      .then((data) => setSuggestions(data.results.slice(0, 5)))
      .catch((err) => console.error("Error fetching suggestions:", err));
  };

  const handleSuggestionClick = (suggestedMovie) => {
    navigate(`/search/${suggestedMovie.title}`);
    setInput(suggestedMovie.title);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="search-input"
      />
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(movie)}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
      <div className="search-results">
        <h2>Search Results for "{searchTerm}"</h2>
        <div className="search-results__list">
          {searchResults.length > 0 ? (
            searchResults.map((movie) => <Card key={movie.id} movie={movie} />)
          ) : (
            <p>No movies found for "{searchTerm}".</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
