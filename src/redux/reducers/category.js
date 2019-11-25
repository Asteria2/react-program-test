import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from '../action-types/category';
const initState = [];
export default function categories(prevState = initState, action) {
  switch (action.type) {
    case GET_CATEGORY_SUCCESS:
      return action.data;
    case ADD_CATEGORY_SUCCESS:
      return [...prevState, action.data];
    case UPDATE_CATEGORY_SUCCESS:
      return prevState.map((category) => {
        if (category._id === action.data._id) {
          return action.data;
        } else {
          return category;
        }
      })
    case DEL_CATEGORY_SUCCESS:
      return prevState.filter((category) => category._id !== action.data)
    default:
      return prevState;
  }
}