import {
  SOCKET_CONNECT,
  SOCKET_ADDED_POST,
  SOCKET_CONNECTING,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
  SOCKET_RECEIVED_NEW_POST_INFO,
} from "./types";

export const socketConnect = (username) => async (dispatch, getState) => {
  dispatch({ type: SOCKET_CONNECT, payload: { username } });
};
export const broadcastThatPostWasAdded = () => async (dispatch, getState) => {
  console.log("SOCKET_ADDED_POST");
  dispatch({ type: SOCKET_ADDED_POST });
};
export const socketReceivedNewPostInfo = () => async (dispatch, getState) => {
  dispatch({ type: SOCKET_RECEIVED_NEW_POST_INFO });
};
export const socketConnecting = () => async (dispatch, getState) => {
  dispatch({ type: SOCKET_CONNECTING });
};
export const socketConnected = () => async (dispatch, getState) => {
  dispatch({ type: SOCKET_CONNECTED });
};
export const socketDisconnect = () => async (dispatch, getState) => {
  dispatch({ type: SOCKET_DISCONNECT });
};
export const socketDisconnected = () => async (dispatch, getState) => {
  dispatch({
    type: SOCKET_DISCONNECTED,
  });
};
