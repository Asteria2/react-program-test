import React, { Component } from "react";
import routes from "./config/routes";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {routes.map(route => {
            return <Route {...route} key={route.path} />;
          })}
        </Switch>
      </Router>
    );
  }
}
