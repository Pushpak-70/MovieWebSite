import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Movie from "./pages/movieDetails/Movie";
import MovieList from "./components/movieList/movieList";
import SearchResult from "./pages/searchMovie/SearchResult"; // Corrected import

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="movie/:id" element={<Movie />} />
          <Route path="movies/:type" element={<MovieList />} />
          <Route path="/*" element={<h1>Error Page</h1>} />
          <Route path="/search/:searchTerm" element={<SearchResult />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
