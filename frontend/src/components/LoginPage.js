import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const history = useHistory(); // Using useHistory instead of useNavigate
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", formData, {
        headers: { "Content-Type": "application/json" },
      });

      // If login is successful, store the token and redirect to home page
      localStorage.setItem("token", response.data.token);
      alert("Login successful!");
      localStorage.setItem("username", formData.username);
      history.push("/"); // Redirect to home page
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSignupRedirect = () => {
    history.push("/signup"); // Redirect to signup page
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome to FurEver Bond</h2>
        <p>Your perfect pet adoption companion 🐾</p>

        {error && <p className="error-message">{error}</p>}

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="login-btn" onClick={handleLogin}>Login</button>
        <button className="signup-btn" onClick={handleSignupRedirect}>Sign Up</button>
      </div>
    </div>
  );
};

export default LoginPage;
