import React, { Component } from "react";
import { Table, Card, Button, Icon, Modal } from "antd";
import { connect } from "react-redux";
import AddCategoryForm from "./addCategory/AddCategoryForm";
import UpdateCategoryForm from "./updateCategory/UpdateCategoryForm";
import {
  getCategoriesAsync,
  addCategoryAsync,
  updateCategoryAsync,
  delCategoryAsync
} from "../../redux/action-creators/category";

@connect(state => ({ categories: state.categories }), {
  getCategoriesAsync,
  addCategoryAsync,
  updateCategoryAsync,
  delCategoryAsync
})
class Category extends Component {
  state = {
    addCategoryVisible: false,
    updateCategoryVisible: false,
    category: {}
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
  updateCategory = () => {
    this.updateCategoryForm.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        const categoryId = this.state.category._id;
        await this.props.updateCategoryAsync(categoryId, categoryName);
        this.hidden("updateCategory")();
      }
    });
  };

  delCategory = category => {
    return () => {
      Modal.confirm({
        title: `您确定要删除${category.name}分类吗？`,
        onOk: () => {
          this.props.delCategoryAsync(category._id);
        }
      });
    };
  };
  showAdd = () => {
    this.setState({
      addCategoryVisible: true
    });
  };
  showUpdate = category => {
    return () => {
      this.setState({
        updateCategoryVisible: true,
        category
      });
    };
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
            <Button type="link" onClick={this.showUpdate(category)}>
              修改分类
            </Button>
            <Button type="link" onClick={this.delCategory(category)}>
              删除分类
            </Button>
          </div>
        );
      }
    }
  ];
  render() {
    const { addCategoryVisible, updateCategoryVisible, category } = this.state;
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

        <Modal
          title="修改分类"
          visible={updateCategoryVisible}
          onOk={this.updateCategory}
          onCancel={this.hidden("updateCategory")}
          width={300}
        >
          <UpdateCategoryForm
            categoryName={category.name}
            wrappedComponentRef={form => (this.updateCategoryForm = form)}
          />
        </Modal>
      </div>
    );
  }
}
export default Category;
