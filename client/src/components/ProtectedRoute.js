/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice";
import { HideLoading, ShowLoading } from "../redux/loadersSlice";
import "./ProtectedRoute.css";
const ProtectedRoute = ({ children }) => {
  //const [user, setUser] = useState(null);
  const user = useSelector((state) => state.users.user); //const {user} = useSelector((state)=>state.users);
  //console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const userDetails = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      dispatch(SetUser(userDetails));
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    } else {
      validateUserToken();
    }
  }, []);

  if (!user) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading user details...</p>
      </div>
    );
  }
  return (
    <div>
      {user && (
        <div className="p-1">
          <div className="header">
            <h1 className="headerText" onClick={() => navigate("/")}>
              {" "}
              LIBRARY MANAGEMENT APP
            </h1>

            <div className="d-flex align-items-center gap-1 bg-white headerRight">
              <i className="ri-shield-user-line"></i>
              <span
                className="text-sm underline "
                onClick={() => navigate("/profile")}
              >
                {user.name.toUpperCase()}
              </span>
              <i
                className="ri-logout-box-r-line"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>
          <div>{children}</div>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
