import React, { Component } from "react";
import { Form, Input } from "antd";

@Form.create()
class AddUserForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 15 }}>
        <Form.Item label="用户名">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "请输入用户名" }]
          })(<Input placeholder="请输入用户名" />)}
        </Form.Item>
        <Form.Item label="密码">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码" }]
          })(<Input placeholder="请输入密码" />)}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator("phone", {
            rules: [{ required: true, message: "请输入手机号" }]
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "请输入邮箱" }]
          })(<Input placeholder="请输入邮箱" />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator("role", {
            rules: [{ required: true, message: "请输入角色" }]
          })(<Input placeholder="请输入角色" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default AddUserForm;
