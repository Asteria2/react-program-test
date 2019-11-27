import React, { Component } from "react";
import { Card, Descriptions, Icon } from "antd";
import { connect } from "react-redux";
import { getCategoriesAsync } from "../../../redux/action-creators/category";
import { reqGetProduct } from "../../../api";

@connect(state => ({ categories: state.categories }), { getCategoriesAsync })
class ProductDetail extends Component {
  state = {
    product: null
  };
  componentDidMount() {
    if (!this.props.categories.length) {
      this.props.getCategoriesAsync();
    }
    if (!this.props.location.state) {
      reqGetProduct(this.props.match.params._id).then(res => {
        this.setState({
          product: res
        });
      });
    }
  }
  goback = () => {
    this.props.history.goBack();
  };
  render() {
    const product = this.props.location.state || this.state.product;
    const { categories } = this.props;
    const { name, desc, price, categoryId, detail, status } = product;
    const category = categories.find(category => category._id === categoryId);
    const categoryName = category && category.name;
    console.log(product);
    return (
      <Card
        title={
          <div>
            <Icon type="arrow-left" onClick={this.goback}></Icon>
            &nbsp;&nbsp;商品详情
          </div>
        }
      >
        <Descriptions bordered>
          <Descriptions.Item label="商品名称">{name}</Descriptions.Item>
          <Descriptions.Item label="商品状态">
            {status === 1 ? "下架" : "上架"}
          </Descriptions.Item>
          <Descriptions.Item label="商品价格">￥{price}</Descriptions.Item>
          <Descriptions.Item label="商品分类">{categoryName}</Descriptions.Item>
          <Descriptions.Item label="商品描述" span={2}>
            {desc}
          </Descriptions.Item>
          <Descriptions.Item label="商品详情">
            <div dangerouslySetInnerHTML={{ __html: detail }}></div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    );
  }
}
export default ProductDetail;
