import React, { useEffect, useState } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Movie = () => {
  const [currentMovieDetail, setMovie] = useState({});
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        )
          .then((res) => res.json())
          .then((credits) => setCast(credits.cast.slice(0, 10)))
          .catch((err) => console.error("Error fetching credits:", err));
      })
      .catch((err) => console.error("Error fetching movie details:", err));
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="movie">
      <div className="movie__intro">
        <img
          className="movie__backdrop"
          src={`https://image.tmdb.org/t/p/original${
            currentMovieDetail.backdrop_path || ""
          }`}
          alt={currentMovieDetail.original_title}
        />
      </div>
      <div className="movie__detail">
        <div className="movie__detailLeft">
          <div className="movie__posterBox">
            <img
              className="movie__poster"
              src={`https://image.tmdb.org/t/p/original${
                currentMovieDetail.poster_path || ""
              }`}
              alt={currentMovieDetail.original_title}
            />
          </div>
        </div>
        <div className="movie__detailRight">
          <div className="movie__detailRightTop">
            <div className="movie__name">
              {currentMovieDetail.original_title || ""}
            </div>
            <div className="movie__tagline">
              {currentMovieDetail.tagline || ""}
            </div>
            <div className="movie__rating">
              {currentMovieDetail.vote_average || ""}{" "}
              <i className="fas fa-star" />
              <span className="movie__voteCount">
                {currentMovieDetail.vote_count
                  ? `(${currentMovieDetail.vote_count}) votes`
                  : ""}
              </span>
            </div>
            <div className="movie__runtime">
              {currentMovieDetail.runtime
                ? `${currentMovieDetail.runtime} mins`
                : ""}
            </div>
            <div className="movie__releaseDate">
              {currentMovieDetail.release_date
                ? `Release date: ${currentMovieDetail.release_date}`
                : ""}
            </div>
            <div className="movie__genres">
              {currentMovieDetail.genres
                ? currentMovieDetail.genres.map((genre) => (
                    <span className="movie__genre" key={genre.id}>
                      {genre.name}
                    </span>
                  ))
                : ""}
            </div>
          </div>
          <div className="movie__detailRightBottom">
            <div className="synopsisText">Synopsis</div>
            <div>{currentMovieDetail.overview || ""}</div>
          </div>
        </div>
      </div>
      <div className="movie__cast">
        <div className="movie__heading">Cast</div>
        <Slider {...sliderSettings}>
          {cast.map((actor) => (
            <div key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Movie;
