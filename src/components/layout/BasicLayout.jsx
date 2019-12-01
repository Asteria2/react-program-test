import { Layout } from "antd";
import React, { Component } from "react";
import LeftNav from "./left-nav/LeftNav";
import checkLogin from "../../containers/check-login";
import HeaderNav from "./header-nav/HeaderNav";
import ThemeColor from "./theme-color/ThemeColor";
import { Switch, Route } from "react-router-dom";
import { authRoutes } from "../../config/routes";
import { connect } from "react-redux";
const { Sider } = Layout;

const { Header, Content, Footer } = Layout;
@checkLogin
@connect(state => ({ rootMenus: state.user.user.menus }))
class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay: true
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({
      collapsed,
      isDisplay: !this.state.isDisplay
    });
  };

  render() {
    const { collapsed, isDisplay } = this.state;
    const { rootMenus } = this.props;
    const filterRoutes = authRoutes.filter(
      route => !route.path || rootMenus.find(menu => route.path === menu)
    );
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <LeftNav isDisplay={isDisplay} />
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <HeaderNav />
          </Header>
          <Content style={{ margin: "50px 16px 0 16px" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              <Switch>
                {filterRoutes.map((route, index) => {
                  return <Route {...route} key={index} />;
                })}
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            欢迎使用硅谷后台管理系统~~
          </Footer>
        </Layout>
        <ThemeColor />
      </Layout>
    );
  }
}
export default BasicLayout;
