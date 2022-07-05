import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BarChart from "../Charts/BarChart";
import PieChart from "../Charts/PieChart";
import Table from "../Charts/Table";

const Analytics = () => {
  const navigate = useNavigate();
  let getData = localStorage.getItem("selectedDates");
  let endDate;
  let startDate;

  if (getData) {
    let getSelectedDates = JSON.parse(getData);
    endDate = Date.parse(getSelectedDates.endDate);
    startDate = Date.parse(getSelectedDates.startDate);
  }

  useEffect(() => {
    if (!getData) {
      toast.error("Please Select Date Range First", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate("/dashboard/date-range-picker");
    }
    // eslint-disable-next-line
  }, [getData]);

  const clickHandler = () => {
    navigate("/dashboard/date-range-picker");
  };
  return (
    <>
      {getData && (
        <div className="analytics-height d-flex flex-column justify-content-center align-items-center overflow-x">
          <div className=" d-flex  ">
            <div className="card-hover mr-3 p-2 bar-height bg-white">
              <BarChart
                startDate={startDate.toString()}
                endDate={endDate.toString()}
              />
            </div>
            <div className=" card-hover table-height bg-white p-2  overflow-auto">
              <Table
                startDate={startDate.toString()}
                endDate={endDate.toString()}
              />
            </div>
          </div>

          <div className="d-flex mt-3">
            <div className=" card-hover  pie-height bg-white p-3  mr-3 ">
              <PieChart
                startDate={startDate.toString()}
                endDate={endDate.toString()}
              />
            </div>
            <div className="card-hover dates bg-white p-2 d-flex flex-column justify-content-around align-items-center">
              <h5>User : Sigmoid</h5>
              <h6>
                Showing Data from{" "}
                <span className="highlight">
                  {" "}
                  {new Date(parseInt(startDate)).toLocaleDateString(
                    "en-IN"
                  )}{" "}
                </span>
                to
                <span className="highlight">
                  {" "}
                  {new Date(parseInt(endDate)).toLocaleDateString("en-IN")}
                </span>
              </h6>
              <button
                onClick={clickHandler}
                className="btn btn-md  bg-theme-btn text-white text-center m-3 "
              >
                Change Dates
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Analytics;
