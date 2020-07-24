import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
} from "../actions/types";

const initialState = {
  items: [],
  loading: false,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
