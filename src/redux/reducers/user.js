import {
  GET_USER_SUCCESS
} from '../action-types/user';
import {
  getItem
} from '../../utils/storage';
const initState = getItem('user') || {};
export default function user(prevState = initState, action) {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return action.data
    default:
      return prevState;
  }
}