import React, { Component } from "react";
import { Form, Input, Tree } from "antd";
import PropTypes from "prop-types";
import navMenus from "../../../config/navMenus";

const { TreeNode } = Tree;

@Form.create()
class SetControlForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired
  };
  state = {
    autoExpandParent: true,
    selectedKeys: []
  };
  treeData = [
    {
      title: "平台权限",
      key: "0-0",
      children: navMenus.map(menu => {
        if (menu.children) {
          return {
            title: menu.title,
            key: menu.path,
            children: menu.children.map(child => {
              return {
                title: child.title,
                key: child.path
              };
            })
          };
        } else {
          return {
            title: menu.title,
            key: menu.path
          };
        }
      })
    }
  ];
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} />;
    });
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name } = this.props.role;
    return (
      <Form>
        <Form.Item label="角色名称：">
          {getFieldDecorator("roleName", {
            initialValue: name
          })(<Input placeholder="请输入角色名称" disabled />)}
        </Form.Item>
        <Tree checkable defaultExpandAll={true}>
          {this.renderTreeNodes(this.treeData)}
        </Tree>
      </Form>
    );
  }
}
export default SetControlForm;
