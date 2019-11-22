import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/logo.png";
import "./laft-nav.less";
import { Link } from "react-router-dom";
import navMenus from "../../../config/navMenus";

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  state = {
    menus: []
  };
  createMenu = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.icon}
            title={
              <span>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
              </span>
            }
          >
            {menu.children.map(child => this.createMenuItem(child))}
          </SubMenu>
        );
      } else {
        return this.createMenuItem(menu);
      }
    });
  };
  createMenuItem = menu => {
    return (
      <Menu.Item key={menu.icon}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };
  componentDidMount() {
    this.setState({
      menus: this.createMenu(navMenus)
    });
  }
  render() {
    return (
      <div>
        <div className="leftNav-logo">
          <img src={logo} alt="logo" />
          <h3>硅谷后台</h3>
        </div>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}
