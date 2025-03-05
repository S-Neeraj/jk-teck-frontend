import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
      const response = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      const data = await response.json();
      setSuccess("Post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create a New Post</h2>

              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Content</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write your content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button
                    className="btn btn-success"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Publishing...
                      </>
                    ) : (
                      "Publish"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
