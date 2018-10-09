export function addRemoveFavoriteMovie(id) {
  return {
    type: 'ADD_REMOVE_FAVORITE',
    payload: id
  }
}