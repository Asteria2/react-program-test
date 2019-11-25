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