import {
  GET_USER_SUCCESS,
  REMOVE_USER_SUCCESS,
  UPDATE_USER_SUCCESS
} from '../action-types/user';
import {
  getItem
} from '../../utils/storage';
const initState = getItem('user') || {};
export default function user(prevState = initState, action) {
  switch (action.type) {
    case REMOVE_USER_SUCCESS:
      return {};
    case GET_USER_SUCCESS:
      return action.data;
    case UPDATE_USER_SUCCESS:
      return prevState.map((user) => {
        if (user.username === action.data.username) {
          return action.data;
        }
        return user;
      });
    default:
      return prevState;
  }
}