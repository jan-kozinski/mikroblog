import React from "react";
import "./css/style.css";
import { Provider } from "react-redux";
import store from "./app-state/store";
import Wall from "./components/layout/Wall";
import Navbar from "./components/layout/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div id="container" className="bg-gray-300 ">
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <Wall />
              </Route>
              <Route
                path="/page/:page"
                render={(props) => {
                  return <Wall page={props.match.params.page} />;
                }}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
