import { combineReducers } from "redux"

import movieDb from "./movie-db-reducers"
import favorite from "./movie-favorite-reducers"

export default combineReducers({
    movieDb,
    favorite
})
