import axios from "axios";
import {
  BAR_CHART_FAIL,
  BAR_CHART_LOADING,
  BAR_CHART_SUCCESS,
  PIE_FAIL,
  PIE_LOADING,
  PIE_SUCCESS,
  TABLE_FAIL,
  TABLE_LOADING,
  TABLE_SUCCESS,
} from "../Constants/ChartsConstant";

export const getChartData = (object) => async (dispatch, getState) => {
  try {
    dispatch({ type: BAR_CHART_LOADING });

    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/api/v1/getData",
      object,
      config
    );

    dispatch({ type: BAR_CHART_SUCCESS, payload: data.result.data });
  } catch (error) {
    dispatch({
      type: BAR_CHART_FAIL,
      payload: error.response.data.statusMessage,
    });
  }
};

export const getBarChartData = (object) => async (dispatch, getState) => {
  try {
    dispatch({ type: BAR_CHART_LOADING });

    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/api/v1/getData",
      object,
      config
    );

    dispatch({ type: BAR_CHART_SUCCESS, payload: data.result.data });
  } catch (error) {
    dispatch({
      type: BAR_CHART_FAIL,
      payload: error.response.data.statusMessage,
    });
  }
};

export const getTableData = (object) => async (dispatch, getState) => {
  try {
    dispatch({ type: TABLE_LOADING });

    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/api/v1/getData",
      object,
      config
    );

    dispatch({ type: TABLE_SUCCESS, payload: data.result.data });
  } catch (error) {
    dispatch({
      type: TABLE_FAIL,
      payload: error.response.data.statusMessage,
    });
  }
};

export const getPieData = (object) => async (dispatch, getState) => {
  try {
    dispatch({ type: PIE_LOADING });

    const { token } = getState().userLogin.userInfo;
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    };

    const { data } = await axios.post(
      "https://sigviewauth.sigmoid.io/api/v1/getData",
      object,
      config
    );

    dispatch({ type: PIE_SUCCESS, payload: data.result.data });
  } catch (error) {
    dispatch({
      type: PIE_FAIL,
      payload: error.response.data.statusMessage,
    });
  }
};
