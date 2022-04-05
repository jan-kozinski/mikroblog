import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import useSockets from "./middleware/useSockets";
import rootReducer from "./reducers/index";

const initialState = {};

const middleware = [thunk, useSockets()];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);
export default store;
