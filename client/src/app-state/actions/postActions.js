import axios from "axios";
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING } from "./types";
import { returnErrors } from "./errorActions";

// export const fetchPosts = () => async (dispatch) => {
//   dispatch(setPostsLoading());
//   try {
//     const response = await axios.get("/api/mikroblog");
//     dispatch({
//       type: GET_POSTS,
//       payload: { posts: response.data },
//     });
//   } catch (error) {
//     dispatch(returnErrors(error.response.data, error.response.status));
//   }
// };

export const fetchPosts = () => (dispatch) => {
  dispatch(setPostsLoading());
  axios
    .get("/api/mikroblog")
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addPost = (post) => async (dispatch) => {
  const response = await axios.post("/api/mikroblog", post);

  try {
    dispatch({
      type: ADD_POST,
      payload: { newPost: response.data },
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
  }
};

export const deletePost = (_id) => async (dispatch) => {
  const response = await axios.delete(`api/mikroblog/${_id}`);

  try {
    dispatch({
      type: DELETE_POST,
      payload: { _id: response.data },
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
