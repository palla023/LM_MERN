/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

export default function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const { name, email, phone, password } = formData;
  let navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(ShowLoading());
      if (!name || !email || !password) {
        toast.error("Please fill in all the fields.");
        dispatch(HideLoading());
        return;
      }
      const response = await RegisterUser(formData);
      // console.log("Registration response:", response);
      dispatch(HideLoading());
      toast.success("User Registered Successfully !", {
        position: toast.POSITION.TOP_CENTER,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      dispatch(HideLoading());
      console.log("Registration Error:", err);
    }
  };
  //y we used this means, if you already logged in , we dont need to do anything with the registration or login page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="Register">
      <div className="RegisterWrapper">
        <div className="RegisterLeft ">
          <h3 className="RegisterLogo">Library Management App</h3>
          <span className="RegisterDesc">
            Manages and stores book information electronically.
          </span>
        </div>
        <div className="RegisterRight">
          <div className="RegisterBox">
            <input
              placeholder="Username"
              name="name"
              value={name}
              className="RegisterInput"
              onChange={changeHandler}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={changeHandler}
              className="RegisterInput"
            />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={phone}
              className="RegisterInput"
              onChange={changeHandler}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
              className="RegisterInput"
            />

            <button className="RegisterButton" onClick={submitHandler}>
              Sign Up
            </button>
            <div className="buttondiv">
              <Link to="/login" className="w-100">
                <button className="RegisterLoginButton">
                  Log into Account
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

//line 29 alternative Wait for the toast to be displayed for a few seconds
// await new Promise((resolve) => setTimeout(resolve, 3000));
// navigate("/login");
