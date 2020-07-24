import React from "react";
import "./css/style.css";
import { Provider } from "react-redux";
import store from "./app-state/store";
import Wall from "./components/layout/Wall";
import Navbar from "./components/layout/Navbar";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navbar />
        <Wall />
      </Provider>
    );
  }
}

export default App;
