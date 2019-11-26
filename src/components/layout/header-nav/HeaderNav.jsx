import React, { Component } from "react";
import { Button, Icon, Modal } from "antd";
import "./header-nav.less";
import { connect } from "react-redux";
import { removeItem } from "../../../utils/storage";
import { removeUserSuccess } from "../../../redux/action-creators/user";
import dateFormat from "../../../utils/dateFormat";
import { withRouter } from "react-router-dom";
import screenfull from "screenfull";
import navMenus from "../../../config/navMenus";

const { confirm } = Modal;
@withRouter
@connect(
  state => ({
    username: state.user.user.username
  }),
  { removeUserSuccess }
)
class HeaderNav extends Component {
  state = {
    isFullscreen: false,
    date: dateFormat(Date.now()),
    title: "",
    pathname: ""
  };
  fullScreen = () => {
    screenfull.toggle();
  };
  changeScreen = () => {
    this.setState({
      isFullscreen: !this.state.isFullscreen
    });
  };
  componentDidMount() {
    screenfull.on("change", this.changeScreen);
    this.timer = setInterval(() => {
      this.setState({
        date: dateFormat(Date.now())
      });
    }, 1000);
  }
  componentWillUnmount() {
    screenfull.off("change", this.changeScreen);
    clearInterval(this.timer);
  }

  showConfirm = () => {
    confirm({
      title: "您确定要退出登录吗？",
      onOk: () => {
        //退出登录
        //清除用户数据（localstorage和redux）
        removeItem("user");
        this.props.removeUserSuccess();
        //跳转到/login页面
        this.props.history.replace("/login");
      },
      onCancel() {}
    });
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    const { pathname } = nextProps.location;
    let title = "";
    if (pathname === prevState.pathname) {
      return prevState;
    }
    for (let index = 0; index < navMenus.length; index++) {
      const menu = navMenus[index];
      if (menu.children) {
        const child = menu.children.find(child =>
          pathname.startsWith(child.path)
        );
        if (child) {
          title = child.title;
          break;
        }
      } else if (menu.path === pathname) {
        title = menu.title;
      }
    }
    return {
      title,
      pathname
    };
  }
  render() {
    const { isFullscreen, date, title } = this.state;
    const { username } = this.props;
    return (
      <div className="header-nav">
        <div className="header-nav-up">
          <Button size="small" onClick={this.fullScreen}>
            <Icon type={isFullscreen ? "fullscreen-exit" : "fullscreen"}></Icon>
          </Button>
          <Button size="small" className="header-nav-lang">
            English
          </Button>
          <span>欢迎&nbsp;&nbsp;{username}</span>
          <Button type="link" onClick={this.showConfirm}>
            退&nbsp;&nbsp;出
          </Button>
        </div>
        <div className="header-nav-down">
          <h3>{title}</h3>
          <span>{date}</span>
        </div>
      </div>
    );
  }
}
export default HeaderNav;
