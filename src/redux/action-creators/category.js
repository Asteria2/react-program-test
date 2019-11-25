import {
  reqGetCategories,
  reqAddCategory,
  reqUpdateCategory,
  reqDelCategory
} from "../../api";
import {
  GET_CATEGORY_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_SUCCESS,
  DEL_CATEGORY_SUCCESS
} from "../action-types/category";
const getCategoriesSuccess = categories => {
  return {
    type: GET_CATEGORY_SUCCESS,
    data: categories
  };
};

export const getCategoriesAsync = () => {
  return dispatch => {
    return reqGetCategories().then(response => {
      const action = getCategoriesSuccess(response);
      dispatch(action);
    });
  };
};
const addCategorySuccess = category => {
  return {
    type: ADD_CATEGORY_SUCCESS,
    data: category
  };
};
export const addCategoryAsync = categoryName => {
  return dispatch => {
    return reqAddCategory(categoryName).then(response => {
      const action = addCategorySuccess(response);
      dispatch(action);
    });
  };
};
const updateCategorySuccess = category => {
  return {
    type: UPDATE_CATEGORY_SUCCESS,
    data: category
  };
};
export const updateCategoryAsync = (categoryId, categoryName) => {
  return dispatch => {
    return reqUpdateCategory(categoryId, categoryName)
      .then(response => {
        dispatch(updateCategorySuccess(response));
      });
  };
};
const delCategorySuccess = (categoryId) => ({
  type: DEL_CATEGORY_SUCCESS,
  data: categoryId
})
export const delCategoryAsync = (categoryId) => {
  return (dispatch) => {
    return reqDelCategory(categoryId)
      .then((response) => {
        dispatch(delCategorySuccess(response));
      })
  }
}