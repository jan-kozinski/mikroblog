import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING,
  GET_POST_LIKES,
} from "../actions/types";

const initialState = {
  posts: [],
  loading: false,
  nextPage: false,
  prevPage: false,
};

export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: action.payload.posts,
        nextPage: action.payload.nextPage,
        prevPage: action.payload.prevPage,
      };
    case GET_POST_LIKES:
      const postsUpdatedByLike = state.posts.map((post) =>
        post._id === action.payload.id
          ? {
              ...post,
              likes: action.payload.likes,
              likersIds: action.payload.likersIds,
            }
          : post
      );

      return {
        ...state,
        posts: postsUpdatedByLike,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload.newPost, ...state.posts],
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
