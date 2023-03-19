import { React, useEffect } from "react";
import "./landing.css";
import Hnav from "../../components/Hnav";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/auth/authSlice";

export default function Landing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isSuccess } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    dispatch(reset());
  }, [user, isError, isSuccess]);
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
        <button className="login-button">
          <Link to="/login" className="login-signup-btn">
            Log in
          </Link>
        </button>
        <hr className="hr-line"></hr>
        <button className="signup-button">
          <Link to="/signup" className="login-signup-btn">
            Sign-up
          </Link>
        </button>
        <img src="/media/Landing.jpeg" className="landing-img"></img>
      </div>
    </div>
  );
}
