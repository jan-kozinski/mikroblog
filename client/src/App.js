import React from "react";
import "./css/style.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import store from "./app-state/store";
import Wall from "./components/layout/Wall";
import Navbar from "./components/layout/Navbar";
import UserProfile from "./components/layout/UserProfile";
import Messages from "./components/userpannel/Messages";

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
              <Route
                path="/user/:username"
                render={(props) => {
                  return (
                    <UserProfile
                      page={1}
                      specifiedAuthor={props.match.params.username}
                    />
                  );
                }}
              />
              <Route path="/messages" render={(props) => <Messages />} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
