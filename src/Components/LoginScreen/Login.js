import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearError, login } from "../../Actions/AuthAction";
import "../LoginScreen/login.css";
import NavBar from "../NavBar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password, rememberMe));
  };
  const navigate = useNavigate();

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

    if (userInfo?.token) {
      navigate("/dashboard/date-range-picker");
    }
    console.log(userInfo);
  }, [error, navigate, userInfo, success, dispatch]);

  return (
    <>
      <NavBar />

      <div className="container-fluid  height  d-flex justify-content-center align-items-center  ">
        <div className="form-card p-3">
          <h4 className="color heading text-center mb-3">Sign In</h4>

          <form onSubmit={loginHandler} className=" color">
            <div className="form-group">
              <input
                className="form-control bg-transparent"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                className="form-control bg-transparent"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <p className="text-right color">Forgot Password?</p>

            <div className=" form-group mb-3">
              <div className="d-flex">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    id="formBasicChecko"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />{" "}
                </div>
                <div>Remember me</div>
              </div>
            </div>
            {loading && (
              <button
                className="btn btn-clr btn-block"
                // type="submit"
                onClick={() => {}}
              >
                <div className="spinner-border text-light" role="status">
                  <span className="sr-only"></span>
                </div>
              </button>
            )}
            {!loading && (
              <button className="btn btn-clr btn-block " type="submit">
                Sign In
              </button>
            )}
          </form>

          <div className="row mt-2">
            <div className="col">
              <p>
                Don't have an account?{" "}
                <button
                  //   onClick={}
                  className=" remove-btn-style color"
                >
                  Register Here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
