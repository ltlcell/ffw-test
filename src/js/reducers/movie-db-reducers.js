export default function reducer(state = {
  movies: [],
  listRecommendedMovies: [],
  searchMovies: [],
  favoriteMovies: [],
  fetching: false,
  fetched: false,
  imageFetching: false,
  imageFetched: false,
  isOpen: false,
  searchFetching: false,
  searchFetched: false,
  recommendedFetching: false,
  recommendedFetched: false,
  searchText: "",
  error: null,
  isFavorite: false,
  fetchingFavorites: false,
  showAllMovies: true,
  showFavoritesMovies: false,
}, action) {

  switch (action.type) {
    case "FETCH_MOVIES": {
      return { ...state, fetching: true }
    }
    case "FETCH_MOVIES_REJECTED": {
      return { ...state, fetching: false, error: action.payload }
    }
    case "FETCH_MOVIES_FULFILLED": {
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: state.movies.concat(action.payload.results),
      }
    }
    case "VIEW_MOVIE_CARD": {
      return { ...state, imageFetching: true }
    }
    case "VIEW_MOVIE_CARD_REJECTED": {
      return { ...state, imageFetching: false, error: action.payload }
    }
    case "VIEW_MOVIE_CARD_FULFILLED": {
      return {
        ...state,
        imageFetching: false,
        imageFetched: true,
        isOpen: true,
        movieCard: action.payload,
      }
    }
    case "SEARCH_MOVIES": {
      return { ...state, searchFetching: true, }
    }
    case "SEARCH_MOVIES_REJECTED": {
      return { ...state, searchFetching: false, error: action.payload }
    }
    case "SEARCH_MOVIES_FULFILLED": {
      return {
        ...state,
        searchFetching: false,
        searchFetched: true,
        searchMovies: action.payload,
      }
    }
    case "RECOMMENDED_MOVIES": {
      return { ...state, recommendedFetching: true, }
    }
    case "RECOMMENDED_MOVIES_REJECTED": {
      return { ...state, recommendedFetching: false, error: action.payload }
    }
    case "RECOMMENDED_MOVIES_FULFILLED": {
      return {
        ...state,
        recommendedFetching: false,
        recommendedFetched: true,
        listRecommendedMovies: action.payload,
      }
    }
    case "CLOSE_MOVIE_CARD": {
      return {
        ...state,
        isOpen: false,
      }
    }
    case "SHOW_FAVORITE_MOVIES": {
      return { ...state, fetchingFavorites: true }
    }
    case "SHOW_FAVORITE_MOVIES_FULFILLED": {
      return {
        ...state,
        favoriteMovies: state.favoriteMovies.concat(action.payload),
        showAllMovies: false,
        showFavoritesMovies: true
      }
    }
    case "SHOW_ALL_MOVIES": {
      return {
        ...state,
        showAllMovies: true,
        showFavoritesMovies: false,
        favoriteMovies: []
      }
    }    
    default: {}
  }

  return state;
}