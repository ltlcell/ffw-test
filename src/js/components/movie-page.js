import React, { Component } from "react"
import { connect } from "react-redux"
import _ from 'lodash';

import { fetchMovies, searchMovies, showAllMovies, showFavoriteMovies } from "../actions/movie-db-actions";
import { addRemoveFavoriteMovie } from "../actions/movie-favorite-actions";

import * as scrollHelpers from '../helpers/scroll';

import MovieCard from "./movieCard.jsx";
import MovieListBox from "./movieListBox.jsx"

class MoviePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      currentPage: 1
    };
    this.handleScroll = this.handleScroll.bind(this);
    this.onTextboxChangeSearchText = this.onTextboxChangeSearchText.bind(this);
  }

  componentDidMount() {
    window.onscroll = this.handleScroll;
    this.props.dispatch(fetchMovies(this.state.currentPage))
  }

  componentWillMount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  onTextboxChangeSearchText(event) {
    let search = event.target.value;
    this.props.dispatch(searchMovies(search))
    this.setState({
      searchText: search
    })
  }

  handleScroll() {
    const { imageFetching } = this.props;
    if (!imageFetching) {
      let percentageScrolled = scrollHelpers.getScrollDownPercentage(window);
      if (percentageScrolled > .8) {
        const nextPage = this.state.currentPage + 1;
        this.props.dispatch(fetchMovies(nextPage));
        this.setState({ currentPage: nextPage });
      }
    }
  }

  render() {
    const {
      searchText
    } = this.state;

    const { movies, searchMovies, searchFetched, showAll, showFavorites, favoriteMovies, movieCard } = this.props;

    if (showAll) {
      let mappedMovies = searchFetched ?
        searchMovies.map(movie => <MovieListBox movie={movie} trigger={() => this.props.dispatch(addRemoveFavoriteMovie(movie.id))} key={movie.id}/>) :
        movies.map(movie => <MovieListBox movie={movie} trigger={() => this.props.dispatch(addRemoveFavoriteMovie(movie.id))} key={movie.id}/>)
      return (
        <div className="movie-page">
          <div className="filters-container">
            <div>
              <input
                type="text"
                placeholder="Search Movie"
                className="search-input"
                value={searchText}
                onChange={this.onTextboxChangeSearchText}
              />
            </div>
            <div className="filter__button-container">
              <button className="filter__button" onClick={() => this.props.dispatch(showFavoriteMovies())}>View Favorites</button>
            </div>
          </div>

          <div className="movie__elements">{mappedMovies}</div>
          <MovieCard trigger={() => this.props.dispatch(addRemoveFavoriteMovie(movieCard.id))} key={movieCard.id} />
        </div>
      )
    }
    else if (showFavorites) {
      const mappedMovies = favoriteMovies.map(movie =>
        <MovieListBox movie={movie} trigger={() => this.props.dispatch(addRemoveFavoriteMovie(movie.id))} key={movie.id} />
      )
      return (
        <div className="movie-page favorites--page">
          <button className="filter__button" onClick={() => this.props.dispatch(showAllMovies())}>View All</button>
          <div className="movie__elements">{mappedMovies}</div>
          <MovieCard trigger={() => this.props.dispatch(addRemoveFavoriteMovie(movieCard.id))} key={movieCard.id} />
        </div>
      )
    }
  }
}

export default connect(
  (state) => ({
    movies: _.get(state, 'movieDb.movies', []),
    movieCard: _.get(state, 'movieDb.movieCard', []),
    searchMovies: _.get(state, 'movieDb.searchMovies.results', []),
    searchFetched: _.get(state, 'movieDb.searchFetched'),
    showAll: _.get(state, 'movieDb.showAllMovies'),
    showFavorites: _.get(state, 'movieDb.showFavoritesMovies'),
    favoriteMovies: _.get(state, 'movieDb.favoriteMovies', []),
  })
)(MoviePage);