import axios from 'axios';
import codeMassage from '../config/codeMassage';
// axios上有create方法，可以创建axios的实例对象
const axiosEx = axios.create({
  //这里可以写发送axios请求的一些公共的请求信息
  baseURL: "http://localhost:5000/api",
  timeout: 10000 //如果请求超时10s后还没有响应结果就中断请求
});
//设置axios拦截器
//请求拦截器 在请求发送之前触发拦截回调函数
axiosEx.interceptors.request.use(
  (config) => {
    // console.log(config)
    if (config.method === "post") {
      //如果请求方式为post则要指明content-type的类型
      config.headers["content-type"] = "application/x-www-form-urlencoded";
      /*修改data数据 成 urlencoded
      { key1: value1, key2: value2 } ---> 'key1=value1&key2=value2'
    */
      config.data = Object.keys(config.data)
        .reduce((previous, current) => {
          const value = config.data[current];
          return previous + `&${current}=${value}`;
        }, "")
        .substring(1);
    }
    if (token) {
      config.headers.authorization = "Bearer " + token;
    }
    return config;
  }
);
//设置响应拦截器，在响应返回之前触发拦截回调函数

//响应成功触发是当status在200~299之间
//响应拦截器触发是在响应成功后设置响应回调函数之前
axiosEx.interceptors.response.use(
  //响应成功
  (response) => {
    if (response.data.status === 0) {
      //功能成功返回数据
      return response.data.data;
    } else {
      //功能响应失败返回错误信息
      alert(response.data.msg);
      return Promise.reject(response.data.msg) //参数可以不传
    }
  },
  //响应失败
  (error) => {
    /*
        服务器没开 Network Error ---> error.message
        请求超时 timeout of 1000ms exceeded 
        没网 Network Error
        error.response 如果有值，服务器返回了响应 / 如果没有值，服务器没有返回响应
        error.response.status 401 没有携带token
        401 token过期或无效
        404 资源找不到
        403 禁止访问
        500 服务器内部错误
      */
    let erorMassage = '';
    if (error.response) {
      erorMassage = codeMassage[error.response.status] || '未知错误';
    } else {
      if (error.message.indexOf('Network Error') !== -1) {
        erorMassage = '请检查网络连接';
      } else if (error.message.indexOf('timeout') !== -1) {
        erorMassage = '网速太差，刷新不出来';
      } else {
        erorMassage = '未知错误';
      }
    }
    alert(erorMassage);
    return Promise.reject(erorMassage); //参数可以不传
  }
);
export default axiosEx;