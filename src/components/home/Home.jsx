import React, { Component } from "react";
import checkLogin from "../../containers/check-login";
import BasicLayout from "../layout/Layout";
@checkLogin
class Home extends Component {
  render() {
    return (
      <div>
        <BasicLayout />
      </div>
    );
  }
}
export default Home;
