import React from "react";
import "./css/style.css";
import { Wall } from "./components/Wall";
import { Provider } from "react-redux";
import store from "./app-state/store";
import { POSTS_LOADING } from "./app-state/actions/types";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wall />
      </Provider>
    );
  }
}

export default App;
