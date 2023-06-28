import axios from "axios";

const API_BASE_URL = "http://localhost:5000";
// const API_BASE_URL = "https://library-management-dqov.onrender.com";

//add book

export const AddBook = async (payload) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/books/add-book`,
      payload,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//get all books
export const GetBooks = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/books/get-all-books`,
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

//update book

export const UpdateBook = async (payload) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/api/books/update-book/${payload._id}`,payload,
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

//delete book

export const DeleteBook = async (id) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/books/delete-book/${id}`,
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

// get book by id
export const GetBookById = async (id) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/books/get-book/${id}`,
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
}
