import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
        const response = await fetch("http://localhost:4000/posts/me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = () => {
    navigate("/create-post");
  };

  const handleRoute = (id) => {
    navigate("/post/" + id);
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <button className="btn btn-success" onClick={handleChange}>
          Create Post
        </button>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <p>
        Welcome, <strong>{auth.currentUser?.displayName || "User"}</strong>
      </p>

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row">
        {posts.length > 0
          ? posts.map((post) => (
              <div
                key={post.id}
                className="col-md-4 mb-4"
                onClick={() => handleRoute(post.id)}
              >
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>

                    <p className="card-text">
                      {post.content.length > 100 ? (
                        <>
                          {post.content.substring(0, 100)}...
                          <span
                            className="text-primary fw-bold"
                            style={{ cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRoute(post.id);
                            }}
                          >
                            {" "}
                            Read More
                          </span>
                        </>
                      ) : (
                        post.content
                      )}
                    </p>

                    <p className="text-muted small">
                      Posted on: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : !loading && (
              <p className="text-muted text-center">No posts available</p>
            )}
      </div>
    </div>
  );
};

export default Dashboard;
