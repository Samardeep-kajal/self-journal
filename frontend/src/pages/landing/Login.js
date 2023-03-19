import { useState, useEffect } from "react";
import "./landing.css";
import Hnav from "../../components/Hnav";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/Spinner";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
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
        <section className="login-box">
          <form onSubmit={onSubmit}>
            <h2 className="login-head">Login</h2>
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
            <button type="submit" className="login-submit-form-btn">
              Submit
            </button>
          </form>
        </section>
        <img src="/media/Landing.jpeg" class="landing-img"></img>
      </div>
    </div>
  );
}
