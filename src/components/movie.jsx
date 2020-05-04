import React, { Component } from "react";
import { getGenresByID } from "../stores/services/moviesService";
import { Link } from "react-router-dom";

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  renderGridMovie = movie => (
    movie.poster_path !== null ? (
    <div
      className="tile movie"
      key={movie.id}>
            <div className="poster-container">
            {movie.release_date ? (
              <Link to={`/movie?id=${movie.id}`}>
                <img
                  className="responsive-img movie-poster"
                  alt="Poster"
                  src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path}
                />
              </Link>
              ) : (
                <Link to={`/tv?id=${movie.id}`}>
                <img
                  className="responsive-img movie-poster"
                  alt="Poster"
                  src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path}
                />
                </Link>
              )}
              {/* <div className="widgets-container">
                {movie.release_date ? (
                  <div className="release-date">{movie.release_date.substring(0,4)}</div>
                ) : (
                  ""
                )}
              </div> */}
            </div>
          <div>
      </div>
    </div>
    ) : (
    " "
    )
  );

  renderListMovie = movie => (
    movie.poster_path !== null ? (
    <div class="row movie-list">
      <div className="col-md-3">
        <Link to={`/movie?id=${movie.id}`}>
          <div className="poster-container list justify-content-center">
            <img
              className="responsive-img movie-poster movie-poster-list"
              src={"http://image.tmdb.org/t/p/w500/" + movie.poster_path}
              alt="Poster image"
            />
          </div>
        </Link>
      </div>
      <div className="col-md-9">
        <div className="text-container-list">
          <Link to={`/movie?id=${movie.id}`}>
            <h1 className="movie-title-list">{movie.title}</h1>
          </Link>
          <div className="movie-genre mb-2">
            {getGenresByID(movie.genre_ids).map(g => (
              <span key={g.id}> {g.name} </span>
            ))}
          </div>
          {movie.release_date ? (
            <div className="release-date-list">Release Date: {movie.release_date}</div>
          ) : (
            ""
          )}
          <p className="list-movie-overview">{movie.overview}</p>
        </div>
      </div>
    </div>
    ) : (
    " "
    )
  );

  render() {
    const { movie, type } = this.props;
    switch (type) {
      case "grid":
        return this.renderGridMovie(movie);
      case "list":
        return this.renderListMovie(movie);

      default:
        return this.renderGridMovie(movie);
    }
  }
}

export default Movie;
