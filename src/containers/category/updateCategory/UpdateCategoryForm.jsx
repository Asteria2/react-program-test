import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";
@Form.create()
class UpdateCategoryForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };
  validator = (rule, value, callback) => {
    // if(value)
    console.log(value);
    if (value === this.props.categoryName) {
      callback("请修改商品分类");
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categoryName } = this.props;
    return (
      <Form>
        <Form.Item>
          {getFieldDecorator("categoryName", {
            rules: [
              { required: true, message: "请输入分类名称" },
              { validator: this.validator }
            ],
            initialValue: categoryName
          })(<Input placeholder="请输入商品名称" />)}
        </Form.Item>
      </Form>
    );
  }
}
export default UpdateCategoryForm;
