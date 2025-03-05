import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock authentication function
const isAuthenticated = () => !!localStorage.getItem("user");

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
        <Route
          path="/create-post"
          element={<PrivateRoute element={<CreatePost />} />}
        />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
