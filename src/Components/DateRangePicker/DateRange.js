import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useDispatch, useSelector } from "react-redux";
import { getDateRange } from "../../Actions/GetDateAction";
import { clearError, logout } from "../../Actions/AuthAction";
import { toast } from "react-toastify";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

const DateRange = () => {
  const { loading, error, dates, success } = useSelector(
    (state) => state.dateRange
  );

  const [state, setState] = useState({
    compare: {
      startDate: new Date(),
      endDate: new Date(),
      key: "compare",
    },
  });

  const navigate = useNavigate();

  const data = {
    organization: "DemoTest",
    view: "Auction",
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDateRange(data));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(clearError());
    }

    if (error === "Unauthorised Attempt, Session Expired") {
      dispatch(logout());
      navigate("/login");
    }

    if (success) {
      setState((prev) => ({
        ...prev,
        compare: {
          startDate: new Date(parseInt(dates.startDate)),
          endDate: addDays(new Date(parseInt(dates.startDate)), 1),
          key: "compare",
        },
      }));
    }
    // eslint-disable-next-line
  }, [dispatch, success, error]);

  const clickHandler = () => {
    navigate("/dashboard/analytics");

    localStorage.setItem("selectedDates", JSON.stringify(state.compare));
  };

  return (
    <>
      {loading && <Loader />}
      {success && (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="m-3">
            Will Fetch Data from{" "}
            <span className="highlight">
              {" "}
              {state.compare.startDate.toLocaleDateString("en-IN")}{" "}
            </span>
            to
            <span className="highlight">
              {" "}
              {state.compare.endDate.toLocaleDateString("en-IN")}
            </span>
          </div>
          <div className="shadow-box">
            <DateRangePicker
              onChange={(item) => setState({ ...state, ...item })}
              months={1}
              minDate={new Date(parseInt(dates.startDate))}
              maxDate={new Date(parseInt(dates.endDate))}
              direction="vertical"
              scroll={{ enabled: true }}
              ranges={[state.compare]}
            />
          </div>
          <button
            onClick={clickHandler}
            className="btn btn-md  bg-theme-btn text-white text-center m-3 "
          >
            Countinue
          </button>
        </div>
      )}
    </>
  );
};

export default DateRange;
