import * as actions from "../actions/socketActions";
import {
  SOCKET_CONNECT,
  SOCKET_ADDED_POST,
  SOCKET_CONNECTING,
  SOCKET_CONNECTED,
  SOCKET_DISCONNECT,
  SOCKET_DISCONNECTED,
} from "../actions/types";
import io from "socket.io-client";

export default function useSockets() {
  let socket = null;
  return (store) => (next) => (action) => {
    switch (action.type) {
      case SOCKET_CONNECT:
        if (socket !== null) {
          socket.close();
        }

        // connect to the remote host
        socket = io(`http://localhost:5000`);
        socket.on("connect", () => {
          console.log("established ws connection");
          if (action.payload.username)
            socket.emit("authorised-user-connected", {
              name: action.payload.username,
            });
          store.dispatch(actions.socketConnected());

          socket.on("new-post-added", () => {
            console.log("new psot received");
            store.dispatch(actions.socketReceivedNewPostInfo());
          });
        });

        socket.on("disconnect", () => {
          console.log("closed ws connection");
          if (action.payload.username)
            socket.emit(
              "authorised-user-disconnected",
              action.payload.username
            );
          store.dispatch(actions.socketDisconnected());
        });

        break;
      case SOCKET_ADDED_POST:
        if (socket) {
          console.log("SOCKET_ADDED_POST fires");
          socket.emit("new-post-added");
        }
        break;
      case SOCKET_DISCONNECT:
        console.log("closing ws connection...");
        if (socket !== null) {
          socket.close();
        }
        socket = null;

        break;

      //   case "NEW_MESSAGE":
      //     console.log("sending a message", action.msg);
      //     socket.send(
      //       JSON.stringify({ command: "NEW_MESSAGE", message: action.msg })
      //     );
      //     break;
      default:
        return next(action);
    }
  };
}
