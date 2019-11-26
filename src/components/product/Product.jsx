import React, { Component } from "react";
import { Card, Select, Button, Icon, Table, Input } from "antd";
import { reqGetProducts } from "../../api";
import "./product.less";

export default class Product extends Component {
  state = {
    products: [],
    total: 0
  };
  columns = [
    {
      title: "商品名称",
      dataIndex: "name"
    },
    {
      title: "商品描述",
      dataIndex: "desc"
    },
    {
      title: "价格",
      dataIndex: "price"
    },
    {
      title: "状态",
      dataIndex: "status",
      render: () => {
        return (
          <div>
            <Button type="primary">上架</Button>
            已下架
          </div>
        );
      }
    },
    {
      title: "操作",
      render: yyy => {
        console.log(yyy);
        return (
          <div>
            <Button type="link">详情</Button>
            <Button type="link">修改</Button>
          </div>
        );
      }
    }
  ];
  getProducts = async (pageNum, pageSize) => {
    const result = await reqGetProducts(pageNum, pageSize);
    this.setState({
      products: result.list,
      total: result.total
    });
  };
  componentDidMount() {
    this.getProducts(1, 3);
  }
  addProducts = () => {
    this.props.history.push("/product/add");
  };
  render() {
    const { products, total } = this.state;
    return (
      <Card
        title={
          <div>
            <Select value={1}>
              <Select.Option value={1}>根据商品名称</Select.Option>
              <Select.Option value={2}>根据商品描述</Select.Option>
            </Select>
            <Input placeholder="关键字" className="product-search" />
            <Button type="primary">搜索</Button>
          </div>
        }
        extra={
          <Button type="primary" onClick={this.addProducts}>
            <Icon type="plus" />
            添加商品
          </Button>
        }
      >
        <Table
          columns={this.columns}
          dataSource={products}
          bordered
          rowKey="_id"
          pagination={{
            showQuickJumper: true,
            showSizeChanger: true,
            pageSizeOptions: ["3", "6", "9"],
            defaultPageSize: 3,
            total,
            onChange: this.getProducts, //可以改变页码
            onShowSizeChange: this.getProducts //可以设置一页有几条数据
          }}
        />
      </Card>
    );
  }
}
