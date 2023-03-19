import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteJournal } from "../features/journal/journalSlice";
import { FiTrash2 } from "react-icons/fi";
export default function JournalCard({ journal }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className="journal-container">
        <div className="journal-card">
          <h3>
            <Link
              to={`/read/${journal._id}`}
              state={{ title: journal.title, text: journal.text }}
              className="journal-title"
            >
              {journal.title}
            </Link>
          </h3>
          <p className="journal-desc">{journal.text.slice(0, 150)}...</p>
          <button
            onClick={() => dispatch(deleteJournal(journal._id))}
            className="close"
          >
            <FiTrash2 className="close-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
