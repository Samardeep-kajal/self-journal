import React, { useState } from "react";
import Vnav from "../../components/Vnav";
import "./template.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createJournal } from "../../features/journal/journalSlice";
export default function Template() {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createJournal({ text, title }));
    setText("");
    setTitle("");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="template-container">
      <Vnav />
      <form onSubmit={onSubmit}>
        <h2 className="journal-heading">7th June, 2022</h2>
        <button className="write-in-save" type="submit">
          SUBMIT
        </button>
        <div className="temp-container">
          <div className="write-in">
            <h2 className="write-in-topic">Title -</h2>
            <input
              className="write-in-title"
              type={text}
              name="text"
              id="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div className="write-in">
            <h1 className="write-in-topic">Journaling Time!</h1>
            <textarea
              className="write-in-text"
              type={text}
              name="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        </div>
      </form>
    </div>
  );
}
