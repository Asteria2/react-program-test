import React, { Component } from "react";
import { Menu, Icon } from "antd";
import logo from "../../../assets/logo.png";
import "./laft-nav.less";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import navMenus from "../../../config/navMenus";
import { connect } from "react-redux";

const { SubMenu } = Menu;

@connect(state => ({
  rootMenus: state.user.user.menus
}))
@withRouter
class LeftNav extends Component {
  static propTypes = {
    isDisplay: PropTypes.bool.isRequired
  };
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
    let { pathname } = this.props.location;
    const { rootMenus } = this.props;
    const filterMenu = navMenus.reduce((p, menu) => {
      if (rootMenus.indexOf(menu.path) !== -1) {
        return [...p, menu];
      }
      if (menu.children) {
        const newMenu = { ...menu };
        newMenu.children = newMenu.children.filter(
          child => rootMenus.indexOf(child.path) !== -1
        );
        return [...p, newMenu];
      }
      return p;
    }, []);
    pathname = pathname.startsWith("/product") ? "/product" : pathname;
    const openKey = this.findOpenKey(filterMenu, pathname);
    const menuList = this.createMenu(filterMenu);
    return (
      <div>
        <div className="leftNav-logo">
          <img src={logo} alt="logo" />
          <h3 style={{ display: this.props.isDisplay ? "block" : "none" }}>
            硅谷后台
          </h3>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={[pathname]}
          defaultOpenKeys={[openKey]}
          mode="inline"
        >
          {menuList}
        </Menu>
      </div>
    );
  }
}
export default LeftNav;
