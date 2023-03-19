import "./singleJournal.css";
import Vnav from "../../components/Vnav";
import React from "react";
import { useLocation } from "react-router-dom";

function SingleJournal() {
  const location = useLocation();

  return (
    <div className="single-journal">
      <Vnav />
      <div>
        <h1 className="title">{location.state.title}</h1>
        <p className="content">{location.state.text}</p>
      </div>
    </div>
  );
}

export default SingleJournal;
