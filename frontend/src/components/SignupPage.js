import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "../components/Signup.css";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState(""); 
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/signup",
        { username: formData.username, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage("✅ Signup successful! Redirecting...");
      setTimeout(() => history.push("/login"), 2000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "❌ Signup failed! Please try again."
      );
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Create a new account</p>

        <form onSubmit={handleSubmit}>
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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-redirect">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
