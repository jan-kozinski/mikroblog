import axios from "axios";
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from "./types";
import { returnErrors } from "./errorActions";

export const fetchPosts = () => async (dispatch) => {
  dispatch(setPostsLoading());
  try {
    const response = await axios.get("/api/mikroblog");
    dispatch({
      type: GET_POSTS,
      payload: { posts: response.data.posts },
    });
  } catch (error) {
    dispatch(returnErrors(error.data, error.status));
  }
};

export const addPost = (post) => async (dispatch) => {
  try {
    const response = await axios.post("/api/mikroblog", post);
    dispatch({
      type: ADD_POST,
      payload: { newPost: response.data.post },
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deletePost = (_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`api/mikroblog/${_id}`);

    dispatch({
      type: DELETE_POST,
      payload: { _id },
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING,
  };
};
