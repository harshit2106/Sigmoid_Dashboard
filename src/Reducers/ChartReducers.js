import { CLEAR_ERROR } from "../Constants/AuthConstant";
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

export const BarChartReducer = (state = { barChartData: [] }, action) => {
  switch (action.type) {
    case BAR_CHART_LOADING:
      return {
        loading: true,
        success: false,
      };
    case BAR_CHART_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        barChartData: action.payload,
      };

    case BAR_CHART_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const TableReducer = (state = { tableData: [] }, action) => {
  switch (action.type) {
    case TABLE_LOADING:
      return {
        loading: true,
        success: false,
      };
    case TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        tableData: action.payload,
      };

    case TABLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const pieChartReducer = (state = { pieChartData: [] }, action) => {
  switch (action.type) {
    case PIE_LOADING:
      return {
        loading: true,
        success: false,
      };
    case PIE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        pieChartData: action.payload,
      };

    case PIE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
