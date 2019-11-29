import React, { Component } from "react";
import { Form, Input } from "antd";
@Form.create()
class AddRoleForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Form.Item label="角色名称：">
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入角色名称" }]
          })(<Input placeholder="请输入角色名称" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default AddRoleForm;
