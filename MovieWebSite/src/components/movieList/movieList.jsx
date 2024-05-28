import React, { useEffect, useState } from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Card from "../card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();

  useEffect(() => {
    getData(page);
  }, [type, page]);

  const getData = (page) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=${page}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="movie__list">
      <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
      <div className="list__cards">
        {movieList.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span>
          {page} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
