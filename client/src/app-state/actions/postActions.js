import axios from "axios";
import {
  GET_POSTS,
  GET_POST_LIKES,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import { broadcastThatPostWasAdded } from "./socketActions";

export const fetchPosts = (
  page = 1,
  specifiedAuthor,
  postsPerPage = 10
) => async (dispatch) => {
  dispatch(setPostsLoading());
  try {
    const response = specifiedAuthor
      ? await axios.get(
          `/api/mikroblog/author/${specifiedAuthor}?page=${page}&limit=${postsPerPage}`
        )
      : await axios.get(`/api/mikroblog?page=${page}&limit=${postsPerPage}`);

    let data = {};
    data.posts = response.data.posts;
    data.nextPage = response.data.nextPage ? response.data.nextPage : false;
    data.prevPage = response.data.prevPage ? response.data.prevPage : false;

    dispatch({
      type: GET_POSTS,
      payload: { ...data },
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: GET_POSTS,
      payload: { posts: [], prevPage: false, nextPage: false },
    });
  }
};

export const togglePostLike = (id) => async (dispatch, getState) => {
  if (!getState().auth.isAuthenticated) return;

  try {
    const response = await axios.post(
      `/api/like/${id}`,
      {},
      tokenConfig(getState)
    );
    dispatch({
      type: GET_POST_LIKES,
      payload: {
        id: id,
        likes: response.data.likes,
        likersIds: response.data.likersIds,
      },
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const addPost = (post, image) => async (dispatch, getState) => {
  try {
    if (image) {
      try {
        //Save image to cloud storage
        let headers = tokenConfig(getState);
        headers.headers["Content-Type"] = "multipart/form-data";

        const imageData = await axios.post("/api/upload", image, headers);

        //Append img url to the post
        post.imageURL = imageData.data.fileLocation;
        post.imageKey = imageData.data.key;
      } catch (error) {
        console.error(error);
      }
    }
    const response = await axios.post(
      "/api/mikroblog",
      post,
      tokenConfig(getState)
    );
    if (response.data.success) {
      console.log(response.data);
      console.log(post);
      console.log(tokenConfig(getState));
      dispatch(broadcastThatPostWasAdded());

      dispatch({
        type: ADD_POST,
        payload: { newPost: response.data.post },
      });
    }
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deletePost = (_id) => async (dispatch, getState) => {
  try {
    const response = await axios.delete(
      `/api/mikroblog/${_id}`,
      tokenConfig(getState)
    );

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
