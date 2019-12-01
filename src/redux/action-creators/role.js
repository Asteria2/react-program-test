import {
  reqAddRole,
  reqGetRoles,
  reqDelRole,
  reqUpdateRole
} from '../../api'
import {
  GET_ROLES_SUCCESS,
  ADD_ROLE_SUCCESS,
  DEL_ROLE_SUCCESS,
  UPDATE_ROLE_SUCCESS
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
const delRoleSuccess = (role) => ({
  type: DEL_ROLE_SUCCESS,
  data: role
})
export const delRoleAsync = (roleId) => {
  return (dispatch) => {
    return reqDelRole(roleId)
      .then((res) => {
        dispatch(delRoleSuccess(roleId))
      })
  }
}

const updateRoleSuccess = (role) => ({
  type: UPDATE_ROLE_SUCCESS,
  data: role
})
export const updateRoleAsync = ({
  roleId,
  authName,
  menus
}) => {
  return (dispatch) => {
    return reqUpdateRole({
        roleId,
        authName,
        menus
      })
      .then((res) => {
        dispatch(updateRoleSuccess(res))
      })
  }
}