import {
  reqAddRole,
  reqGetRoles
} from '../../api'
import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS
} from '../action-types/role'
const getRolesSuccess = (roles) => ({
  type: GET_ROLES_SUCCESS,
  data: roles
})
export const getRolesAsync = () => {
  return (dispatch) => {
    return reqGetRoles()
      .then((res) => {
        dispatch(getRolesSuccess(res))
      })
  }
}
const addRoleSuccess = (role) => ({
  type: ADD_ROLE_SUCCESS,
  data: role
})
export const addRoleAsync = (name) => {
  return (dispatch) => {
    return reqAddRole(name)
      .then((res) => {
        dispatch(addRoleSuccess(res))
      })
  }
}