import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  posts: postsReducer,
  error: errorReducer,
});
