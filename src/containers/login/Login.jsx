import React, { Component } from "react";
import { Form, Button, Icon, Input } from "antd";
import logo from "./logo.png";
import "./login.less";
import { connect } from "react-redux";
import { setItem } from "../../utils/storage";
import { getUserAsync } from "../../redux/action-creators/user";
const { Item } = Form;
@connect(null, { getUserAsync })
@Form.create()
class Login extends Component {
  validator = (rule, value, callback) => {
    //callback一定要调用  当参数为空时说明校验成功
    const check = rule.field === "username" ? "用户名" : "密码";
    if (!value) {
      callback(`请输入${check}`);
    } else if (!/\w/.test(value)) {
      callback(`${check}只能为数字、字母和下划线`);
    } else if (value.length < 4) {
      callback(`${check}长度至少为4位`);
    } else if (value.length > 12) {
      callback(`${check}长度最多为12位`);
    } else {
      callback();
    }
  };
  login = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //表单校验成功
        const { username, password } = values;

        this.props
          .getUserAsync(username, password)
          .then(response => {
            //请求成功
            setItem("user", response);
            this.props.history.push("/");
          })
          .catch(err => {
            //请求失败
            this.props.form.resetFields(["password"]);
          });
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </header>
        <section className="login-section">
          <Form onSubmit={this.login}>
            <h3>用户登录</h3>
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    validator: this.validator
                  }
                  /* {
                    required: true,
                    message: "请输入用户名"
                  },
                  {
                    min: 4,
                    message: "用户名长度至少为4位"
                  },
                  {
                    max: 12,
                    message: "用户名长度最多为12位"
                  },
                  {
                    pattern: /\w/,
                    message: "用户名只能包含数字、字母和下划线"
                  } */
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                  className="login-input"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    validator: this.validator
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="密码"
                  className="login-input"
                />
              )}
            </Item>
            <Button type="primary" className="login-btn" htmlType="submit">
              登录
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}

export default Login;
