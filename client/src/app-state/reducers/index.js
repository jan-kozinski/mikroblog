import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  entities: postsReducer,
  error: errorReducer,
  auth: authReducer,
});
