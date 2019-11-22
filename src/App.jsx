import React, { Component } from "react";
import { authRoutes, noAuthRoutes } from "./config/routes";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./utils/history";
import BasicLayout from "./components/layout/BasicLayout";
import "./index.css";
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {noAuthRoutes.map((route, index) => {
            return <Route {...route} key={index} />;
          })}
          <BasicLayout>
            <Switch>
              {authRoutes.map((route, index) => {
                return <Route {...route} key={index} />;
              })}
            </Switch>
          </BasicLayout>
        </Switch>
      </Router>
    );
  }
}
