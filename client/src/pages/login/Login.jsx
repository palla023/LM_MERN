/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please fill in all the fields.");
        dispatch(HideLoading());
        return;
      }
      dispatch(ShowLoading());
      const response = await LoginUser(formData);
      dispatch(HideLoading());
      localStorage.setItem("token", response.token);
      
      toast.success("Login Successful !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
     // console.log("Login Error:", err);
      dispatch(HideLoading());
      toast.error("Invalid Credentials !", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft ">
          <h3 className="loginLogo">Library Management App</h3>
          <span className="loginDesc">
            Manages and stores books information electronically.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input
              placeholder="Email"
              type="email"
              name="email"
              value={email}
              onChange={changeHandler}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
              className="loginInput"
            />
            <button className="loginButton" onClick={submitHandler}>
              Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <div className="buttondiv">
              <Link to="/register" className="w-100">
                <button className="loginRegisterButton">
                  Create a New Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
