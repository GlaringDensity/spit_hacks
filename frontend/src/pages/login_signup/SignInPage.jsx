import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillLock } from "react-icons/ai";

import "./SignInPage.css";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    navigate("/");
    return null;
  }

  return (
    <div className="signin-root">
      <div className="signin-div">
        <div className="signin-form">
          <AiFillLock className="signin-icon" />
          <h1>Signin to continue</h1>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              onChange={onChange}
              placeholder="Email"
            />
            <br />
            <input
              type="password"
              name="password"
              onChange={onChange}
              placeholder="Password"
            />
            <br />
            <button type="submit">Submit</button>
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
