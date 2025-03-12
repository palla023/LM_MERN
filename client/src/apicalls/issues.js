import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";
const API_BASE_URL = "https://lm-mern.onrender.com";

// issue a book
export const IssueBook = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/issues/issue-book`,
      payload,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get issues
export const GetIssues = async (payload) => {
	try {
	  const response = await axios.post(
		`${API_BASE_URL}/api/issues/get-issues`,
		payload,
		{
		  headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  throw error;
	}
  };
// return a book
export const ReturnBook = async (payload) => {
	try {
	  const response = await axios.post(
		`${API_BASE_URL}/api/issues/return-book`,
		payload,
		{
		  headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  throw error;
	}
}

// delete an issue
export const DeleteIssue = async (payload) => {
	try {
	  const response = await axios.post(
		`${API_BASE_URL}/api/issues/delete-issue`,
		payload,
		{
		  headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  throw error;
	}
}

// edit an issue
export const EditIssue = async (payload) => {
	try {
	  const response = await axios.post(
		`${API_BASE_URL}/api/issues/edit-issue`,
		payload,
		{
		  headers: {
			authorization: `Bearer ${localStorage.getItem("token")}`,
		  },
		}
	  );
	  return response.data;
	} catch (error) {
	  throw error;
	}
}
