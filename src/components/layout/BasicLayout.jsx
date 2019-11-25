import { Layout } from "antd";
import React, { Component } from "react";
import LeftNav from "./left-nav/LeftNav";
import checkLogin from "../../containers/check-login";
import HeaderNav from "./header-nav/HeaderNav";

const { Sider } = Layout;

const { Header, Content, Footer } = Layout;
@checkLogin
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
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            欢迎使用硅谷后台管理系统~~
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default BasicLayout;
