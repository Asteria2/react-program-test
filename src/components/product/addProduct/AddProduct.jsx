import React, { Component } from "react";
import { Card, Form, Input, Icon, Select, Button, InputNumber } from "antd";
import Editor from "./editor/rich-editor";

@Form.create()
class AddProduct extends Component {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form labelCol={{ span: 2 }} wrapperCol={{ span: 8 }}>
          <Form.Item label="商品名称：">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>
          <Form.Item label="商品描述：">
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "请输入商品描述" }]
            })(<Input placeholder="请输入商品描述" />)}
          </Form.Item>
          <Form.Item label="商品分类：">
            {getFieldDecorator("classify", {
              rules: [{ required: true, message: "请输入商品分类" }]
            })(
              <Select placeholder="请输入商品分类">
                <Select.Option value="1">11111</Select.Option>
                <Select.Option value="2">11111</Select.Option>
                <Select.Option value="3">11111</Select.Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="商品价格：">
            {getFieldDecorator("price", {
              rules: [{ required: true, message: "请输入分类名称" }]
            })(
              <InputNumber
                style={{ width: 150 }}
                formatter={value =>
                  `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={value => value.replace(/\$\s?|(,*)/g, "")}
              />
            )}
          </Form.Item>
          <Form.Item label="商品详情：">
            {getFieldDecorator("detail", {
              rules: [{ required: true, message: "请输入商品详情" }]
            })(<Editor />)}
          </Form.Item>
          <Form.Item>
            <Button type="primary">提交</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default AddProduct;
