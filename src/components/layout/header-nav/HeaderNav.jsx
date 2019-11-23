import React, { Component } from "react";
import { Button, Icon } from "antd";
import "./header-nav.less";
export default class HeaderNav extends Component {
  render() {
    return (
      <div className="header-nav">
        <div className="header-nav-up">
          <Button size="small">
            <Icon type="fullscreen"></Icon>
          </Button>
          <Button size="small" className="header-nav-lang">
            English
          </Button>
          <span>欢迎&nbsp;&nbsp;admin</span>
          <Button type="link">退&nbsp;&nbsp;出</Button>
        </div>
        <div className="header-nav-down">
          <h3>首页</h3>
          <span>xxxxxxxxxxxxx</span>
        </div>
      </div>
    );
  }
}
