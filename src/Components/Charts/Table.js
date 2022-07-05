import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../Actions/AuthAction";
import { getTableData } from "../../Actions/ChartsActions";
import Loader from "../Loader";

const Table = ({ startDate, endDate }) => {
  const dispatch = useDispatch();

  const { loading, error, tableData, success } = useSelector(
    (state) => state.table
  );

  const data = {
    _id: "dashboard1516252439345",
    emailId: "candidate@sigmoid.com",
    orgViewReq: {
      organization: "DemoTest",
      view: "Auction",
    },
    chartObject: {
      metadata: {
        title: "chartobject:1516252439345",
        img_thumbnail: "../img/chart.png",
        chartType: "table",
        dataLimit: 50,
      },
      requestParam: {
        granularity: "hour",
        timeZone: {
          name: "UTC (+00:00)",
          location: "UTC",
        },
        dateRange: {
          startDate: startDate,
          endDate: endDate,
        },
        xAxis: ["D044"],
        yAxis: ["M002"],
        approxCountDistinct: [],
        specialCalculation: [],
        filter: [],
        orderBy: {
          metricOrdByList: [
            {
              id: "M002",
              desc: true,
            },
          ],
        },
        percentCalList: [],
      },
    },
  };

  useEffect(() => {
    dispatch(getTableData(data));
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
    // eslint-disable-next-line
  }, [dispatch, success, error]);

  return (
    <div>
      {" "}
      {loading && <Loader />}
      {!loading && success && (
        <div className="table-responsive   ">
          <table className="table table-bordered  table-sm ">
            <thead>
              <tr>
                <th>Publisher Id</th>
                <th>Impressions Offered</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item) => (
                <tr key={item.publisherId}>
                  <td>{item.publisherId}</td>
                  <td>{item.impressions_offered}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Table;
