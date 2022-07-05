import axios from "axios";
import {
  GET_DATE_RANGE_FAIL,
  GET_DATE_RANGE_LOADING,
  GET_DATE_RANGE_SUCCESS,
} from "../Constants/GetDateRangeConstant";

export const getDateRange = (object) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DATE_RANGE_LOADING });

    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/api/v1/getDateRange",
      object,
      config
    );

    dispatch({ type: GET_DATE_RANGE_SUCCESS, payload: data.result });
  } catch (error) {
    dispatch({
      type: GET_DATE_RANGE_FAIL,
      payload:
        error.response && error.response.status === 401
          ? "Unauthorised Attempt, Session Expired"
          : "error occured",
    });
  }
};
