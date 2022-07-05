import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBarChartData } from "../../Actions/ChartsActions";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { clearError } from "../../Actions/AuthAction";
import { toast } from "react-toastify";
import Loader from "../Loader";

const BarChart = ({ startDate, endDate }) => {
  const dispatch = useDispatch();
  const [labels, setLabels] = useState([]);
  const [impressions, setImpressions] = useState([]);

  const { loading, error, barChartData, success } = useSelector(
    (state) => state.barChart
  );
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const data = {
    _id: "dashboard1516252235693",
    emailId: "candidate@sigmoid.com",
    orgViewReq: {
      organization: "DemoTest",
      view: "Auction",
    },
    chartObject: {
      metadata: {
        title: "chartobject:1516252235693",
        img_thumbnail: "../img/chart.png",
        chartType: "bar",
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
        xAxis: ["D017"],
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
    dispatch(getBarChartData(data));
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (success) {
      const labels = barChartData.map((item) => item.appSiteId);
      const impressions = barChartData.map((item) =>
        parseInt(item.impressions_offered)
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
  }, [dispatch, success, barChartData, error]);

  const chartData = {
    labels,
    datasets: [
      {
        label: "impression Bar Chart",
        data: impressions,
        backgroundColor: "#573BFF",
      },
    ],
  };

  return (
    <>
      <div>
        {loading && <Loader />}

        {!loading && success && (
          <div style={{ height: "100%" }}>
            <Bar data={chartData} />
          </div>
        )}
      </div>
    </>
  );
};

export default BarChart;
