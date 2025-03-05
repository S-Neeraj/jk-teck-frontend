import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { auth } from "../firebase";

const PostDetails = () => {
  const { id } = useParams(); // Get post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:4000/posts/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch post details");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back to Posts
      </button>

      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {post && (
        <div className="card shadow-sm p-4">
          <h2 className="fw-bold">{post.title}</h2>
          <p className="text-muted small">
            Posted by: {auth.currentUser?.displayName || "User"} |{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

export default PostDetails;
