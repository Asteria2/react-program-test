//用来定义请求方法的模块
import axiosEx from './request';
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
export const reqGetCategories = () => {
  return axiosEx({
    method: 'GET',
    url: '/category/get'
  })
}
export const reqAddCategory = (categoryName) => {
  return axiosEx({
    method: 'POST',
    url: '/category/add',
    data: {
      categoryName
    }
  })
}
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
export const reqDelCategory = (categoryId) => {
  return axiosEx({
    method: 'POST',
    url: '/category/delete',
    data: {
      categoryId
    }
  })
}
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
export const reqGetProduct = (productId) => {
  return axiosEx({
    method: 'GET',
    url: '/product/get',
    params: {
      productId
    }
  })
}