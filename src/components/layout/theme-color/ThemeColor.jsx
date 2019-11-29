import React, { Component } from "react";
import { Icon, Drawer, Divider, Button } from "antd";
import { SketchPicker } from "react-color";
import { getItem, setItem } from "../../../utils/storage";
import "./theme-color.less";

const initialColor = getItem("background") || "#1DA57A";

export default class ThemeColor extends Component {
  state = {
    visible: false,
    background: initialColor,
    prevColor: initialColor
  };

  handleChangeComplete = color => {
    this.setState({ background: color.hex });
  };

  selectColor = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false,
      background: this.state.prevColor
    });
  };
  componentDidMount() {
    this.styleEl = document.getElementById("tool");
    if (!this.styleEl) {
      this.styleEl = document.createElement("style");
      this.styleEl.style.id = "tool";
    }
    this.headEl = document.querySelector("head");
    this.setColor();
  }
  setColor = () => {
    const { background } = this.state;
    const style = `
    html {
      --antd-wave-shadow-color: ${background};
  }
  .ant-btn-primary {
    background-color: ${background};
    border-color: ${background};
  }
  .ant-btn-primary:hover, .ant-btn-primary:focus {
    background-color:  ${background};
    color: #fff;
  }
    .ant-pagination-item-active{
      border-color: ${background};
      color:${background};
    }
    .ant-pagination-item-active:focus, .ant-pagination-item-active:hover {
      border-color: ${background};
  }
  .ant-pagination-item-active a {
    color: ${background};
  }
  .ant-pagination-item:hover {
    border-color: ${background};
  }
  a{
    color: ${background};
  }
  
    .ant-menu.ant-menu-dark .ant-menu-item-selected{
      background-color:${background};
    }
    .header-nav .header-nav-up{
      border-bottom: 1px solid ${background};
    }
    .ant-btn-link {
      color: ${background};
    }
    .tool {
      background-color:${background};
    }
    .ant-btn:hover{
      border-color: ${background};
      color:${background};
    }`;
    this.styleEl.innerHTML = style;
    this.headEl.appendChild(this.styleEl);
    this.setState({
      visible: false,
      prevColor: background
    });
    setItem("background", background);
  };
  render() {
    const { background } = this.state;
    return (
      <div>
        <div className="tool" onClick={this.selectColor}>
          <Icon type="setting" className="set"></Icon>
        </div>
        <Drawer
          title="主题颜色选择"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <SketchPicker
            color={background}
            onChangeComplete={this.handleChangeComplete}
          />
          <Divider solid="true" />
          <Button onClick={this.onClose}>取消</Button>
          <Button onClick={this.setColor}>确认</Button>
        </Drawer>
      </div>
    );
  }
}
