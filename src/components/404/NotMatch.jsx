import React, { Component } from "react";
import checkLogin from "../../containers/check-login";
@checkLogin
class NotMatch extends Component {
  render() {
    return <div>404........</div>;
  }
}
export default NotMatch;
