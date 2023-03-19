import React from "react";
import "../pages/landing/landing.css";
import { Link } from "react-router-dom";

export default function Hnav() {
  return (
    <div className="h-nav">
      <a className="h-nav-logo" href="/">
        <img src="/media/notebook.png"></img>
        <h4>SelfJournal</h4>
      </a>
      <ul>
        <li>
          <a className="about-us" href="/">
            About Us
          </a>
        </li>
      </ul>
    </div>
  );
}
