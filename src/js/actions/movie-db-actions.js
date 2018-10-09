import axios from "axios";

import {
  getFromStorage
} from '../utils/localStorage';

const MOVIE_DB_API_KEY = "a54ee20b6858bbfe1b04579849a89bf2";
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

const searchMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US&query=${queryParams}`;
  return baseUrl;
}


export function fetchMovies(page) {
  return function (dispatch) {
    dispatch({ type: "FETCH_MOVIES" });
    axios.get(createMovieDbUrl('/movie/popular', {
      page
    }))
      .then((response) => {
        dispatch({ type: "FETCH_MOVIES_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "FETCH_MOVIES_REJECTED", payload: err })
      })
  }
}

export function viewMovieCard(id) {
  return function (dispatch) {
    dispatch({ type: "VIEW_MOVIE_CARD" });
    axios.get(createMovieDbUrl('/movie/' + id))
      .then((response) => {
        dispatch({ type: "VIEW_MOVIE_CARD_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "VIEW_MOVIE_CARD_REJECTED", payload: err })
      })
  }
}

export function searchMovies(searchText) {
  return function (dispatch) {
    dispatch({ type: "SEARCH_MOVIES" });
    axios.get(searchMovieDbUrl('/search/multi', searchText))
      .then((response) => {
        dispatch({ type: "SEARCH_MOVIES_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "SEARCH_MOVIES_REJECTED", payload: err })
      })
  }
}

export function recommendedMovies(id) {
  return function (dispatch) {
    dispatch({ type: "RECOMMENDED_MOVIES" });
    axios.get(createMovieDbUrl(`/movie/${id}/recommendations`))
      .then((response) => {
        dispatch({ type: "RECOMMENDED_MOVIES_FULFILLED", payload: response.data })
      })
      .catch((err) => {
        dispatch({ type: "RECOMMENDED_MOVIES_REJECTED", payload: err })
      })
  }
}

export function closeMovieCard() {
  return {
    type: 'CLOSE_MOVIE_CARD',
  }
}

export function showFavoriteMovies() {
  return function (dispatch) {
    dispatch({ type: "SHOW_FAVORITE_MOVIES" });
    const favoriteMoviesID = (getFromStorage('movie_db_favorites').movieId).split(",");
    for (let i = 0; i < favoriteMoviesID.length; i++) {
      axios.get(createMovieDbUrl('/movie/' + String(favoriteMoviesID[i])))
        .then((response) => {
          dispatch({ type: "SHOW_FAVORITE_MOVIES_FULFILLED", payload: response.data })
        })
    }
    
  }
}

export function showAllMovies() {
  return {
    type: 'SHOW_ALL_MOVIES'
  }
}