import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Hnav from "../../components/Hnav";
import { toast } from "react-toastify";
import "./landing.css";
import { useNavigate } from "react-router-dom";
import { signup, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(signup(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <Hnav />
      <div className="landing-container">
        <h1 className="landing-quote">
          Journal writing is a voyage to the interior.
        </h1>
        <h3 className="landing-subhead">
          Join us in this journey & make this platform a small part of your
          self-healing.
        </h3>
        <section className="signup-box">
          <form onSubmit={onSubmit}>
            <h2 className="signup-head">Sign up</h2>
            <input
              type="text"
              placeholder="Enter your username"
              className="input-area"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
            />
            <br />
            <input
              type="email"
              placeholder="Enter your email"
              className="input-area"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <br />
            <input
              type="password"
              placeholder="Enter password"
              className="input-area"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            <br />
            <input
              type="password"
              placeholder="Confirm password"
              className="input-area"
              id="password2"
              name="password2"
              value={password2}
              onChange={onChange}
            />
            <button type="submit" className="signup-submit-form-btn">
              Submit
            </button>
          </form>
        </section>
        <img src="/media/Landing.jpeg" class="landing-img"></img>
      </div>
    </div>
  );
}
