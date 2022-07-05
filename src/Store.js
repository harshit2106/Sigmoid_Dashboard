import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { AuthUser } from "./Reducers/AuthReducers";
import { getDateReducer } from "./Reducers/GetDateReducers";
import {
  BarChartReducer,
  pieChartReducer,
  TableReducer,
} from "./Reducers/ChartReducers";

const reducer = combineReducers({
  userLogin: AuthUser,
  dateRange: getDateReducer,
  barChart: BarChartReducer,
  table: TableReducer,
  pieChart: pieChartReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
