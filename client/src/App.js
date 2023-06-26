import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Profile from "./pages/Profile/Profile";
import BookDescription from "./pages/BookDescription/BookDescription";
function App() {
  const loading = useSelector((state) => state.loaders.loading);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />{" "}
              </ProtectedRoute>
            }
            exact
          />
          <Route
            path="/book/:id"
            element={
              <ProtectedRoute>
                <BookDescription />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />{" "}
              </ProtectedRoute>
            }
            exact
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
