import React, { Component } from "react";
import { Form, Input, Select } from "antd";
import PropTypes from "prop-types";
@Form.create()
class AddUserForm extends Component {
  static propTypes = {
    roles: PropTypes.array.isRequired
  };
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
          })(<Input placeholder="请输入密码" type="password" />)}
        </Form.Item>
        <Form.Item label="手机号">
          {getFieldDecorator("phone", {
            // rules: [{ required: true, message: "请输入手机号" }]
          })(<Input placeholder="请输入手机号" />)}
        </Form.Item>
        <Form.Item label="邮箱">
          {getFieldDecorator("email", {
            // rules: [{ required: true, message: "请输入邮箱" }]
          })(<Input placeholder="请输入邮箱" />)}
        </Form.Item>
        <Form.Item label="角色">
          {getFieldDecorator("roleId", {
            rules: [{ required: true, message: "请输入角色" }]
          })(
            <Select>
              {this.props.roles.map(role => {
                return (
                  <Select.Option key={role._id}>{role.name}</Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
      </Form>
    );
  }
}
export default AddUserForm;
