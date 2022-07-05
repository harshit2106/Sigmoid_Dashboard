import axios from "axios";
import {
  CLEAN_UP,
  CLEAR_ERROR,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from "../Constants/AuthConstant";

export const login = (email, password, rememberMe) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/signIn",
      { email, password, rememberMe },
      config
    );

    const object = {
      token: data.token,
      userName: "Sigmoid",
    };

    dispatch({ type: LOGIN_SUCCESS, payload: object });

    localStorage.setItem("userInfo", JSON.stringify(object));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.statusMessage,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("selectedDates");

  dispatch({ type: LOGOUT_SUCCESS });
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

export const cleanUp = () => async (dispatch) => {
  dispatch({ type: CLEAN_UP });
};
