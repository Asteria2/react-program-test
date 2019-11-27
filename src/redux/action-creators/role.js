import {
  reqGetRoles
} from '../../api'


const getRoleSuccess = () => ({})
export const getRoleAsync = () => {
  return (dispatch) => {
    return reqGetRoles()
      .then((res) => {
        dispatch(getRoleSuccess(res))
      })
  }
}