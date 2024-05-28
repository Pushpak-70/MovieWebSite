// import React, { useState } from "react";
// import "./Header.css";
// import { Link, useNavigate } from "react-router-dom";

// const Header = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSearch = (event) => {
//     event.preventDefault();
//     if (searchTerm.trim()) {
//       navigate(`/search/${searchTerm}`);
//     }
//   };

//   return (
//     <div className="header">
//       <div className="headerLeft">
//         <Link
//           to="/"
//           className="header__icon"
//           style={{ textDecoration: "none" }}
//         >
//           <span>MovieDb</span>
//         </Link>
//       </div>
//       <div className="headerRight">
//         <Link to="/movies/popular" style={{ textDecoration: "none" }}>
//           <span>Popular</span>
//         </Link>
//         <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
//           <span>Top Rated</span>
//         </Link>
//         <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
//           <span>Upcoming</span>
//         </Link>
//         {/* <div className="search-bar">
//                     <input type="text" className="search-input" placeholder="Search..." />
//                     <button className="search-button">Search</button>
//                 </div> */}
//         <form className="search-bar" onSubmit={handleSearch}>
//           <input
//             className="search-input"
//             type="text"
//             placeholder="Search for a movie..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit" className="search-button">
//             Search
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Header;
import React, { useState } from "react";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
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
    setSearchTerm(suggestedMovie.title);
    setSuggestions([]);
    navigate(`/search/${suggestedMovie.title}`);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <Link
          to="/"
          className="header__icon"
          style={{ textDecoration: "none" }}
        >
          <span>MovieDb</span>
        </Link>
      </div>
      <div className="headerRight">
        <Link to="/movies/popular" style={{ textDecoration: "none" }}>
          <span>Popular</span>
        </Link>
        <Link to="/movies/top_rated" style={{ textDecoration: "none" }}>
          <span>Top Rated</span>
        </Link>
        <Link to="/movies/upcoming" style={{ textDecoration: "none" }}>
          <span>Upcoming</span>
        </Link>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
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
        </form>
      </div>
    </div>
  );
};

export default Header;
