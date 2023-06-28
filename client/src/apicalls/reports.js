import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://library-management-dqov.onrender.com";

export const GetReports = async () => {
	try {
	  const response = await axios.get(
		`${API_BASE_URL}/api/reports/get-reports`,
		{
		  headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  console.error("Error fetching books:", error);
	  throw error;
	}
  };