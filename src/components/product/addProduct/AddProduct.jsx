import React, { Component } from "react";
import {
  Card,
  Form,
  Input,
  Icon,
  Select,
  Button,
  InputNumber,
  message
} from "antd";
import BraftEditor from "braft-editor";
// 引入编辑器样式
import "braft-editor/dist/index.css";
import "./rich-editor.less";
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creators/category";
import { reqAddProduct } from "../../../api";

@Form.create()
@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class AddProduct extends Component {
  state = {
    // 创建一个空的editorState作为初始值
    editorState: BraftEditor.createEditorState(null)
  };
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoriesAsync();
    }
  }
  handleEditorChange = editorState => {
    this.setState({ editorState });
  };
  validator = (_, value, callback) => {
    if (!value || value.isEmpty()) {
      callback("请输入正文内容");
    } else {
      callback();
    }
  };
  goback = () => {
    this.props.history.goBack();
  };
  addProduct = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log(values);
        const { name, desc, categoryId, price, editorState } = values;
        const detail = editorState.toHTML();
        await reqAddProduct({ name, desc, categoryId, price, detail });
        message.success("添加商品成功");
        this.props.history.push("/product");
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { categories } = this.props;
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" className="go-back" onClick={this.goback} />
            &nbsp;&nbsp;添加商品
          </div>
        }
      >
        <Form
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 8 }}
          onSubmit={this.addProduct}
        >
          <Form.Item label="商品名称：">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入商品名称" }]
            })(<Input placeholder="请输入商品名称" />)}
          </Form.Item>
          <Form.Item label="商品描述：">
            {getFieldDecorator("desc", {
              rules: [{ required: true, message: "请输入商品描述" }]
            })(<Input placeholder="请输入商品描述" />)}
          </Form.Item>
          <Form.Item label="商品分类：">
            {getFieldDecorator("categoryId", {
              rules: [{ required: true, message: "请输入商品分类" }]
            })(
              <Select placeholder="请输入商品分类">
                {categories.map(category => {
                  return (
                    <Select.Option value={category._id} key={category._id}>
                      {category.name}
                    </Select.Option>
                  );
                })}
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
                parser={value => value.replace(/\￥\s?|(,*)/g, "")}
                // onChange={onChange}
              />
            )}
          </Form.Item>
          <Form.Item label="商品详情：" wrapperCol={{ span: 22 }}>
            {getFieldDecorator("editorState", {
              validateTrigger: "onBlur", // 校验子节点的时机（失去焦点在进行表单校验）
              rules: [
                {
                  required: true,
                  validator: this.validator
                }
              ]
            })(
              <BraftEditor
                className="rich-editor"
                placeholder="请输入正文内容"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}
export default AddProduct;
