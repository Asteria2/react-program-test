import React, { Component } from "react";
import { Form, Input } from "antd";
@Form.create()
class UpdatePasswordForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="密码：">
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入密码" }]
          })(<Input placeholder="请输入密码" />)}
        </Form.Item>
        <Form.Item label="确认密码：">
          {getFieldDecorator("roleName", {
            rules: [{ required: true, message: "请输入确认密码" }]
          })(<Input placeholder="请输入确认密码" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default UpdatePasswordForm;
