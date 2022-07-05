import {
  CLEAR_ERROR,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../Constants/AuthConstant";

export const AuthUser = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userInfo: action.payload,
      };

    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        userInfo: null,
      };

    case LOGOUT_SUCCESS:
      return {};

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
