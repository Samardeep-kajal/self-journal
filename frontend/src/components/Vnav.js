import React from "react";
import "../pages/dashboard/dashboard.css";
import { logout, reset } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
export default function Vnav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset);
    navigate("/");
  };
  return (
    <div class="v-nav">
      <a href="#" class="v-nav-logo">
        <img src="/media/notebook.png"></img>
        <h4>SelfJournal</h4>
      </a>
      <a href="/dashboard" class="acc-details">
        <h3 class="acc-username">
          <FiUser className="acc-details-icon" />
          {user.name}
        </h3>
      </a>
      <ul>
        <li>
          <a class="nav-link">
            <Link to="/journal">Write Journal</Link>
          </a>
        </li>
        <li>
          <a class="nav-link">
            <Link to="/dashboard">Dashboard</Link>
          </a>
        </li>
        <li>
          <a href="/" class="nav-link" onClick={onLogout}>
            Logout
          </a>
        </li>
      </ul>
    </div>
  );
}
