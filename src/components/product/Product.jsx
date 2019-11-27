import React, { Component } from "react";
import { Card, Select, Button, Icon, Table, Input, message } from "antd";
import { reqGetProducts, reqUpdateStatus, reqSearchProducts } from "../../api";
import "./product.less";

export default class Product extends Component {
  state = {
    products: [],
    total: 0,
    selected: "productName",
    searchContent: "",
    current: 1,
    pageSize: 3
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
      // dataIndex: "status",
      render: product => {
        const { status } = product;
        return (
          <div>
            <Button type="primary" onClick={this.updateStatus(product)}>
              {status === 1 ? "上架" : "下架"}
            </Button>
            {status === 1 ? "已下架" : "已上架"}
          </div>
        );
      }
    },
    {
      title: "操作",
      render: product => {
        return (
          <div>
            <Button type="link" onClick={this.productDetail(product)}>
              详情
            </Button>
            <Button type="link" onClick={this.updateProducts(product)}>
              修改
            </Button>
          </div>
        );
      }
    }
  ];
  updateStatus = product => {
    return () => {
      const productId = product._id;
      const status = 3 - product.status;
      reqUpdateStatus(productId, status).then(res => {
        message.success("更新商品状态成功");
        this.setState({
          products: this.state.products.map(product => {
            if (product._id === productId) {
              return { ...product, status };
            } else {
              return product;
            }
          })
        });
      });
    };
  };
  getProducts = async (pageNum, pageSize) => {
    const { selected, searchContent } = this.state;
    let result = null;
    if (searchContent) {
      //搜索商品
      result = await reqSearchProducts({
        selected,
        searchContent,
        pageNum,
        pageSize
      });
    } else {
      //全部商品
      result = await reqGetProducts(pageNum, pageSize);
    }
    this.setState({
      products: result.list,
      total: result.total,
      pageSize,
      current: pageNum
    });
  };
  componentDidMount() {
    const { current, pageSize } = this.state;
    this.getProducts(current, pageSize);
  }
  addProducts = () => {
    this.props.history.push("/product/add");
  };
  updateProducts = product => {
    return () => {
      this.props.history.push("/product/update" + product._id, product);
    };
  };
  productDetail = product => {
    return () => {
      this.props.history.push("/product/detail", product);
    };
  };
  selectChange = value => {
    this.setState({
      selected: value
    });
  };
  inputChange = e => {
    this.setState({
      searchContent: e.target.value.trim()
    });
  };
  search = () => {
    const { current, pageSize } = this.state;
    this.getProducts(current, pageSize);
  };
  render() {
    const { products, total, selected, pageSize, current } = this.state;
    return (
      <Card
        title={
          <div>
            <Select value={selected} onChange={this.selectChange}>
              <Select.Option value="productName">根据商品名称</Select.Option>
              <Select.Option value="productDesc">根据商品描述</Select.Option>
            </Select>
            <Input
              placeholder="关键字"
              onChange={this.inputChange}
              className="product-search"
            />
            <Button type="primary" onClick={this.search}>
              搜索
            </Button>
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
            pageSize,
            current,
            total,
            onChange: this.getProducts, //可以改变页码
            onShowSizeChange: this.getProducts //可以设置一页有几条数据
          }}
        />
      </Card>
    );
  }
}
