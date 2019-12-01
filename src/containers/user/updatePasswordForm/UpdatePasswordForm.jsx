import React, { Component } from "react";
import { Form, Input } from "antd";
@Form.create()
class UpdatePasswordForm extends Component {
  /*  validator = (rule, value, callback) => {
    console.log(rule);
    console.log(value);
    callback();
  }; */
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 16 }}>
        <Form.Item label="新密码：">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入新密码" }]
          })(<Input placeholder="请输入新密码" type="password" />)}
        </Form.Item>
        {/* <Form.Item label="确认密码：">
          {getFieldDecorator("reRoleName", {
            rules: [{ validator: this.validator }]
          })(<Input placeholder="请输入确认密码" />)}
        </Form.Item> */}
      </Form>
    );
  }
}
export default UpdatePasswordForm;
