//用来定义请求方法的模块
import axiosEx from './request';
//请求登录
export const reqLogin = (username, password) => {
  return axiosEx({
    method: "POST",
    url: "/login",
    data: {
      username,
      password
    }
  })
}
//请求获取商品分类
export const reqGetCategories = () => {
  return axiosEx({
    method: 'GET',
    url: '/category/get'
  })
}
//请求添加商品分类
export const reqAddCategory = (categoryName) => {
  return axiosEx({
    method: 'POST',
    url: '/category/add',
    data: {
      categoryName
    }
  })
}
//请求修改商品分类
export const reqUpdateCategory = (categoryId, categoryName) => {
  return axiosEx({
    method: 'POST',
    url: '/category/update',
    data: {
      categoryId,
      categoryName
    }
  })
}
//请求删除商品分类
export const reqDelCategory = (categoryId) => {
  return axiosEx({
    method: 'POST',
    url: '/category/delete',
    data: {
      categoryId
    }
  })
}
//请求获取全部商品数据
export const reqGetProducts = (pageNum, pageSize) => {
  return axiosEx({
    method: 'GET',
    url: '/product/list',
    params: {
      pageNum,
      pageSize
    }
  })
}
//请求添加单个商品
export const reqAddProduct = ({
  name,
  desc,
  categoryId,
  price,
  detail
}) => {
  return axiosEx({
    method: 'POST',
    url: '/product/add',
    data: {
      name,
      desc,
      categoryId,
      price,
      detail
    }
  })
}
//请求修改单个商品数据
export const reqUpdateProduct = ({
  name,
  desc,
  categoryId,
  price,
  detail,
  productId
}) => {
  return axiosEx({
    method: 'POST',
    url: '/product/update',
    data: {
      name,
      desc,
      categoryId,
      price,
      detail,
      productId
    }
  })
}
//请求获取单个商品数据
export const reqGetProduct = (productId) => {
  return axiosEx({
    method: 'GET',
    url: '/product/get',
    params: {
      productId
    }
  })
}
//请求修改商品状态
export const reqUpdateStatus = (productId, status) => {
  return axiosEx({
    method: 'POST',
    url: '/product/update/status',
    data: {
      productId,
      status
    }
  })
}
//请求搜索商品
export const reqSearchProducts = ({
  selected,
  searchContent,
  pageNum,
  pageSize
}) => {
  return axiosEx({
    method: 'GET',
    url: '/product/search',
    params: {
      pageNum,
      pageSize,
      [selected]: searchContent
    }
  })
}