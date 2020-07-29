import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";

// Check token & load user
export const loadUser = () => async (dispatch, getState) => {
  // Set user loading
  dispatch({ type: USER_LOADING });

  try {
    //Get user data
    const response = await axios.get("/api/users/auth", tokenConfig(getState));
    dispatch({
      type: USER_LOADED,
      payload: response.data,
    });
  } catch (error) {
    dispatch(returnErrors(error.response.data, error.response.status));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user

export const register = ({ name, email, password, repeat_password }) => async (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Reqeust body
  const body = JSON.stringify({ name, email, password, repeat_password });

  try {
    const response = await axios.post("/api/users/register", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch(
      returnErrors(error.response.data, error.response.status, "REGISTER_FAIL")
    );
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user
export const login = ({ email, password }) => async (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Reqeust body
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post("/api/users/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch(
      returnErrors(error.response.data, error.response.status, "LOGIN_FAIL")
    );
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout user
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

// Setup config/headers and token

export const tokenConfig = (getState) => {
  // Get token from localstorage
  const token = getState().auth.token;

  // Headers

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  return config;
};
