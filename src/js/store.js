import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';
import reducer from "./reducers/combinedReducers"


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      thunkMiddlware
    )
  )
);

export default store;