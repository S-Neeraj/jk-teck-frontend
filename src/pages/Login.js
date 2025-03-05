import React from "react";
import { auth, googleProvider, facebookProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (provider) => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const token = result.user.stsTokenManager.accessToken;

          fetch("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          })
            .then((response) => response.json())
            .then((data) => {
              localStorage.setItem("user", JSON.stringify(result.user));
              localStorage.setItem(
                "accessToken",
                JSON.stringify(data.accessToken)
              );
              navigate("/dashboard");
            })
            .catch((error) => {
              console.error("Error calling backend API:", error);
            });
        })
        .catch((error) => {
          console.error("Login Error:", error);
        });
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <div
        className="card shadow-lg p-4 text-center"
        style={{ width: "400px", backdropFilter: "blur(10px)" }}
      >
        <h2 className="text-dark fw-bold mb-3">Welcome Back</h2>
        <p className="text-muted mb-4">Sign in to continue</p>

        <button
          onClick={() => handleLogin(googleProvider)}
          className="btn btn-outline-dark w-100 mb-3 d-flex align-items-center justify-content-center gap-2"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="24"
            height="24"
          />
          Sign in with Google
        </button>

        <button
          onClick={() => handleLogin(facebookProvider)}
          className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="Facebook"
            width="24"
            height="24"
          />
          Sign in with Facebook
        </button>

        <p className="mt-4 text-muted">
          By signing in, you agree to our{" "}
          <a href="#" className="text-primary text-decoration-none">
            Terms & Conditions
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
