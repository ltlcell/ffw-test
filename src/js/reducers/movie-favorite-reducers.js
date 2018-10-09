import {
    getFromStorage,
    setInStorage
} from '../utils/localStorage';

export default function reducer(state = {
    isFavorite: true,
}, action) {

    switch (action.type) {
        case "ADD_REMOVE_FAVORITE": {
            let count = 0;
            let storageObj = getFromStorage('movie_db_favorites');
            if (storageObj == null) {
                setInStorage('movie_db_favorites', { "movieId": String(action.payload) })
                return {
                    ...state,
                    isFavorite: true,
                }
            }
            else {
                let movieIdArray = String(storageObj.movieId).split(",")
                for (let i = 0; i < movieIdArray.length; i++) {
                    if (movieIdArray[i].indexOf(action.payload) > -1) {
                        movieIdArray.splice(i, 1);
                        count++;
                        setInStorage('movie_db_favorites', { "movieId": String(movieIdArray) });
                        return {
                            ...state,
                            isFavorite: false
                        }
                    }
                }
                if (count === 0) {
                    movieIdArray.push(action.payload);
                    setInStorage('movie_db_favorites', { "movieId": String(movieIdArray) });
                    return {
                        ...state,
                        isFavorite: true
                    }
                }
            }
            
        }
        /* falls through */
        default: { }              
    }
    return state
}