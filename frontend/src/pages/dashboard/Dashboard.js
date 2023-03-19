import React from "react";
import "./dashboard.css";
import Vnav from "../../components/Vnav";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import JournalCard from "../../components/JournalCard";
import { getJournals, reset } from "../../features/journal/journalSlice";
import Spinner from "../../components/Spinner";
export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { journals, isLoading, isError, message } = useSelector(
    (state) => state.journals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (!user) {
      navigate("/");
    }
    dispatch(getJournals());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="dash-container">
      <Vnav />

      <section className="content">
        {journals.length > 0 ? (
          <div className="journals">
            {journals.map((journal) => (
              <JournalCard key={journal._id} journal={journal} />
            ))}
          </div>
        ) : (
          <h2 className="NA">You have no written journal yet</h2>
        )}
      </section>
    </div>
  );
}
