import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearError } from "../../Actions/AuthAction";
import { getPieData } from "../../Actions/ChartsActions";
import Loader from "../Loader";
import { Chart as ChartJS, ArcElement } from "chart.js";

const PieChart = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);
  const [impressions, setImpressions] = useState([]);

  const { loading, error, pieChartData, success } = useSelector(
    (state) => state.pieChart
  );
  ChartJS.register(ArcElement);

  const options = {
    plugins: {
      legend: false,
      tooltip: true,
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  const data = {
    _id: "Datastory_ChartId_1535224664111",
    emailId: "candidate@sigmoid.com",
    orgViewReq: {
      organization: "DemoTest",
      view: "Auction",
    },
    chartObject: {
      metadata: {
        title: "",
        img_thumbnail: "images/pie.png",
        chartType: "pie",
        dataLimit: 500,
      },
      text: [],
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
        xAxis: ["D005"],
        yAxis: [],
        approxCountDistinct: [],
        specialCalculation: ["CM001"],
        filter: [],
        orderBy: {
          customMetricOrdByList: [
            {
              id: "CM001",
              desc: true,
            },
          ],
        },
        percentCalList: [
          {
            id: "CM001",
          },
        ],
      },
    },
  };

  useEffect(() => {
    if (pieChartData.length === 0) {
      dispatch(getPieData(data));
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (success) {
      const labels = pieChartData.map((item) => item.advertiserId);
      const impressions = pieChartData.map((item) =>
        parseInt(item.CM001_percent)
      );

      setLabels((prev) => [...prev, ...labels]);
      setImpressions((prev) => [...prev, ...impressions]);
    }
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
  }, [dispatch, success, pieChartData, error]);

  const chartData = {
    labels,
    datasets: [
      {
        data: impressions,
        backgroundColor: [
          "#0074D9",
          "#FF4136",
          "#2ECC40",
          "#FF851B",
          "#7FDBFF",
          "#B10DC9",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  };

  return (
    <>
      <div
      // style={{
      //   height: "100%",
      //   width: "40%",

      // }}
      >
        {loading && <Loader />}

        {!loading && success && (
          <div className="d-flex align-items-center justify-content-around">
            <div
              style={{
                height: "100%",
                width: "40%",
              }}
            >
              <Pie data={chartData} options={options} />
            </div>
            <div>Percentage - Advertiser Id</div>
          </div>
        )}
      </div>
    </>
  );
};

export default PieChart;
