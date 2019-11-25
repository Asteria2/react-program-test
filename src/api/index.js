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
export const reqDelCategory = (categoryId) => axiosEx({
  method: 'POST',
  url: '/category/delete',
  data: {
    categoryId
  }
})