import React, { Component } from "react";
import { Table, Card, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import AddCategoryForm from "./addCategory/AddCategoryForm";
import {
  getCategoriesAsync,
  addCategoryAsync
} from "../../redux/action-creators/category";

@connect(state => ({ categories: state.categories }), {
  getCategoriesAsync,
  addCategoryAsync
})
class Category extends Component {
  state = {
    addCategoryVisible: false
  };

  addCategory = () => {
    this.addCategoryForm.props.form.validateFields(async (err, values) => {
      const { categoryName } = values;
      if (!err) {
        await this.props.addCategoryAsync(categoryName);
        this.hidden("addCategory")();
      }
    });
  };
  showAdd = () => {
    this.setState({
      addCategoryVisible: true
    });
  };

  hidden = name => {
    return () => {
      this.setState({
        [name + "Visible"]: false
      });
      setTimeout(() => {
        this[name + "Form"].props.form.resetFields();
      }, 500);
    };
  };
  componentDidMount() {
    this.props.getCategoriesAsync();
  }
  columns = [
    {
      title: "品类名称",
      dataIndex: "name"
    },
    {
      title: "操作",
      render: category => {
        return (
          <div>
            <Button type="link">修改分类</Button>
            <Button type="link">删除分类</Button>
          </div>
        );
      }
    }
  ];
  render() {
    const { addCategoryVisible } = this.state;
    return (
      <div>
        <Card
          title="分类列表"
          extra={
            <Button type="primary" onClick={this.showAdd}>
              <Icon type="plus"></Icon>分类列表
            </Button>
          }
        >
          <Table
            columns={this.columns}
            dataSource={this.props.categories}
            bordered
            rowKey="_id"
            pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              pageSizeOptions: ["3", "6", "9"],
              defaultPageSize: 3
            }}
          />
        </Card>
        <Modal
          title="添加分类"
          visible={addCategoryVisible}
          onOk={this.addCategory}
          onCancel={this.hidden("addCategory")}
          width={300}
        >
          <AddCategoryForm
            wrappedComponentRef={form => (this.addCategoryForm = form)}
          />
        </Modal>
      </div>
    );
  }
}
export default Category;
