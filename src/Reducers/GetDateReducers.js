import { CLEAR_ERROR } from "../Constants/AuthConstant";
import {
  GET_DATE_RANGE_FAIL,
  GET_DATE_RANGE_LOADING,
  GET_DATE_RANGE_SUCCESS,
} from "../Constants/GetDateRangeConstant";

export const getDateReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DATE_RANGE_LOADING:
      return { loading: true, success: false };

    case GET_DATE_RANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        dates: action.payload,
      };

    case GET_DATE_RANGE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};
