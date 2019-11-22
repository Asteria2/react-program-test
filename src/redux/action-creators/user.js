/**
 * 这里定义更新状态数据的方法
 * 用来创建action对象
    同步action creator: 返回值就是action对象
    异步action creator: 返回值是一个函数，在函数中完成异步操作
 */
import {
  reqLogin
} from '../../api';
import {
  GET_USER_SUCCESS,
  REMOVE_USER_SUCCESS
} from '../action-types/user'
const getUserSuccess = (user) => {
  return {
    type: GET_USER_SUCCESS,
    data: user
  }
}
export const removeUserSuccess=()=>{
  return {
    type: REMOVE_USER_SUCCESS
  }
}

export const getUserAsync = (username, password) => {
  return (dispatch) => {
    return reqLogin(username, password)
      .then((response) => {
        const action = getUserSuccess(response)
        dispatch(action);
        return response;
      })

  }
}