import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/logo.png";
import "./laft-nav.less";
import { Link, withRouter } from "react-router-dom";
import navMenus from "../../../config/navMenus";

const { SubMenu } = Menu;
@withRouter
class LeftNav extends Component {
  state = {
    menus: []
  };
  createMenu = menus => {
    return menus.map(menu => {
      if (menu.children) {
        return (
          <SubMenu
            key={menu.path}
            title={
              <span>
                <Icon type={menu.path} />
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
      <Menu.Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <span>{menu.title}</span>
        </Link>
      </Menu.Item>
    );
  };
  findOpenKey = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      if (menu.children) {
        const child = menu.children.find(child => {
          return child.path === pathname;
        });
        if (child) {
          return menu.path;
        }
      }
    }
  };
  componentDidMount() {
    this.setState({
      menus: this.createMenu(navMenus)
    });
  }
  render() {
    const { pathname } = this.props.location;
    const openKey = this.findOpenKey(navMenus, pathname);
    return (
      <div>
        <div className="leftNav-logo">
          <img src={logo} alt="logo" />
          <h3>硅谷后台</h3>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {this.state.menus}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
