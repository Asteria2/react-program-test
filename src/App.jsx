import React, { Component } from "react";
import routes from "./config/routes";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./utils/history";
import "./index.css";
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {routes.map((route, index) => {
            return <Route {...route} key={index} />;
          })}
        </Switch>
      </Router>
    );
  }
}
