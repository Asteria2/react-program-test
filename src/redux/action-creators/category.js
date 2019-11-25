import {
  reqGetCategories,
  reqAddCategory
} from '../../api';
import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS
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
const addCategorySuccess = (category) => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data: category
  }
}
export const addCategoryAsync = (categoryName) => {
  return (dispatch) => {
    return reqAddCategory(categoryName)
      .then((response) => {
        const action = addCategorySuccess(response);
        dispatch(action);
      })
  }
}