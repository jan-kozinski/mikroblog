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

export const addPost = (post, image) => async (dispatch) => {
  try {
    if (image) {
      try {
        //Save image to cloud storage
        const imgUrl = await axios({
          method: "post",
          url: "/api/upload",
          data: image,
          headers: { "Content-Type": "multipart/form-data" },
        });
        //Append img url to the post
        post.imageURL = imgUrl.data.fileLocation;
      } catch (error) {
        console.error(error);
      }
    }
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
