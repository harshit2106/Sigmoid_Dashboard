import React, { useEffect } from "react";
import {
  BsCalendarDateFill,
  BsFillPersonFill,
  BsChatLeftTextFill,
} from "react-icons/bs";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillAppstore, AiTwotoneSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { IoIosNotifications } from "react-icons/io";
import "../DashboardUI/dashboard.css";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Actions/AuthAction";

const Dashboard = () => {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo === null) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <div className="container-fluid">
      <div className="row ">
        {/* <div className="row full-heigh"> */}
        <div className="col-md-1 bg-white">
          <div className="m-3">
            <img
              src="/image/logo.png"
              alt="pic"
              style={{
                maxWidth: "100%",
              }}
            />
          </div>
          <div className="list">
            <ul>
              <li>
                <NavLink
                  to="/dashboard/date-range-picker"
                  style={({ isActive }) =>
                    isActive ? { color: "#573BFF" } : { color: "#C5C7D3" }
                  }
                >
                  <BsCalendarDateFill />
                </NavLink>
              </li>

              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? { color: "#573BFF" } : { color: "#C5C7D3" }
                  }
                  to={"/dashboard/analytics"}
                  data-toggle="tooltip"
                  title="Analytics"
                >
                  <SiGoogleanalytics />
                </NavLink>
              </li>
              <li>
                <BsFillPersonFill />
              </li>
              <li>
                <AiFillAppstore />
              </li>
              <li>
                <IoIosNotifications />
              </li>
              <li>
                <BsChatLeftTextFill />
              </li>
              <li>
                <AiTwotoneSetting />
              </li>
              <li onClick={logOut} className="logout">
                <FiLogOut />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-11 dashboard-color  d-flex justify-content-center align-items-center">
          {userInfo && userInfo.hasOwnProperty("token") && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
