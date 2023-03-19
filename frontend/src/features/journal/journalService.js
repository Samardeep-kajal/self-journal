import axios from "axios";

const API_URL = "/api/journals/";

//Creating new journal
const createJournal = async (journalData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, journalData, config);

  return response.data;
};

//Get user Journals
const getJournals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

//Delete user Journal
const deleteJournal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const journalService = {
  createJournal,
  getJournals,
  deleteJournal,
};

export default journalService;
