import React, { Component } from "react"
import { connect } from "react-redux"
import _ from 'lodash';

import { viewMovieCard, recommendedMovies } from "../actions/movie-db-actions";

class MovieListBox extends Component {
  render() {
    const { isFavorite, movie } = this.props;
    const imagePath = "https://image.tmdb.org/t/p/w300";
    return (
      <div className="movie__box" onClick={() => { this.props.dispatch(viewMovieCard(movie.id)); (this.props.dispatch(recommendedMovies(movie.id))) }}>
        <img src={imagePath + movie.poster_path} alt={movie.title + " poster"} />
        <span>{movie.title}</span>
        <div className={localStorage.movie_db_favorites === undefined ? "movie__favorites-star movie--not-favorite" : JSON.parse(localStorage.movie_db_favorites).movieId.includes(String(movie.id)) | isFavorite ? "movie__favorites-star movie--favorite" : "movie__favorites-star movie--not-favorite" } onClick={(e) => { e.stopPropagation();  this.props.trigger() }}></div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    isFavorite: _.get(state, 'movieDb.isFavorite'),
  })
)(MovieListBox);