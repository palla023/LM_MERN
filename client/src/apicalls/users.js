import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://library-management-dqov.onrender.com";

// register a user
export const RegisterUser = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/register`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("RegisterUser Error:", error);
    throw error;
  }
};

// Login user
export const LoginUser = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/users/login`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("LoginUser Error:", error);
    throw error;
  }
};

//update user details

export const updateUserRole = async (userId, role) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/users/update-user/${userId}`,
      { role },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};




//get loggedin user details
export const GetLoggedInUserDetails = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/getLoggedInUserDetails`,
      {
        headers: {
          authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("GetLoggedInUser Error:", error);
    throw error;
  }
};

//get all users
export const GetAllUsers = async (role) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/get-all-users/${role}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("GetLoggedInUser Error:", error);
    throw error;
  }
};

// get user by id
export const GetUserById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/users/getUserById/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("GetLoggedInUser Error:", error);
    throw error;
  }
};

