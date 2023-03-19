const express = require("express");
const router = express.Router();
const {
  getJournals,
  getJournal,
  setJournal,
  updateJournal,
  deleteJournal,
} = require("../controllers/journalController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getJournals).post(protect, setJournal);
router
  .route("/:id")
  .delete(protect, deleteJournal)
  .put(protect, updateJournal)
  .get(protect, getJournal);
module.exports = router;
