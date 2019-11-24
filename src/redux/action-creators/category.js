import {
  reqGetCategories
} from '../../api';
import {
  GET_CATEGORY_SUCCESS
} from '../action-types/category';
const getCategoriesSuccess = (categories) => {
  return {
    type: GET_CATEGORY_SUCCESS,
    data: categories
  }
}

export const getCategoriesAsync = () => {
  return (dispatch) => {
    return reqGetCategories()
      .then((response) => {
        const action = getCategoriesSuccess(response);
        dispatch(action);
      })
  }
}