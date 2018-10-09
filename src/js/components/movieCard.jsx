import React, { Component } from "react"
import { connect } from "react-redux"
import _ from 'lodash';

import { viewMovieCard, recommendedMovies, closeMovieCard } from "../actions/movie-db-actions";

class MovieCard extends Component {
    render() {
        const { isOpen, movieCard, listRecommendedMovies, isFavorite} = this.props;
        const imagePath = "https://image.tmdb.org/t/p/w300";
        return (
            <div>
                {isOpen ?
                    <div className="movie__background">
                        <div className="movie__card">
                            <div className="movie__close-btn" onClick={() => this.props.dispatch(closeMovieCard())}></div>
                            <h2 className="movie__header">{movieCard.title}</h2>
                            <p className="movie__overview">{movieCard.overview}</p>
                            <div className="movie__genre-names"><b>Genres: </b>{(movieCard && movieCard.genres) ? movieCard.genres.map(genre => genre.name).join(', ') : ''}</div>
                            <div className="movie__recommended">
                                {listRecommendedMovies ? listRecommendedMovies.map((listRecommended, i) =>
                                    i < 3 ?
                                        <div key={listRecommended.id}>
                                            <img src={imagePath + listRecommended.poster_path} alt={listRecommended.title + " poster"} onClick={() => { this.props.dispatch(viewMovieCard(listRecommended.id)); (this.props.dispatch(recommendedMovies(listRecommended.id))) }} key={i}/>
                                        </div> : ""
                                ) : (null)}
                            </div>
                            <div className={localStorage.movie_db_favorites === undefined ? "movie__favorites-star movie--not-favorite" : JSON.parse(localStorage.movie_db_favorites).movieId.includes(String(movieCard.id)) | isFavorite ? "movie__favorites-star movie--favorite" : "movie__favorites-star movie--not-favorite" } onClick={(e) => { e.stopPropagation();  this.props.trigger() }}></div>
                        </div>
                    </div> : ""}
            </div>
        )
    }
}

export default connect(
    (state) => ({
        movieCard: _.get(state, 'movieDb.movieCard', []),
        isOpen: _.get(state, 'movieDb.isOpen'),
        listRecommendedMovies: _.get(state, 'movieDb.listRecommendedMovies.results', []),
        isFavorite: _.get(state, 'movieDb.isFavorite'),
    })
)(MovieCard);