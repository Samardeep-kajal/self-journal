const asyncHandler = require("express-async-handler");

const Journal = require("../models/journalModel");

//@desc get jounals
//@route GET /api/journals
//@access Private
const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user.id });

  res.status(200).json(journals);
});
//@desc Get each individual journal
//@route GET /api/journals/:id
//@access Private
const getJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);
  if (journal) {
    res.status(200).json(journal);
  } else {
    res.status(404).json({ message: "Journal not found" });
  }
});
//@desc Set journals
//@route POST /api/journals
//@access  Private
const setJournal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please Journal something before submitting.");
  }

  const journal = await Journal.create({
    text: req.body.text,
    title: req.body.title,
    user: req.user.id,
  });

  res.status(200).json(journal);
});

//@desc Update journal
//@route PUT api/journals/:id
//@access Private
const updateJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(400);
    throw new Error("Journal not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not authorized");
  }

  if (journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  const updatedJournal = await Journal.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedJournal);
});

//@desc Delete journal
//@route DELETE api/journals/:id
//@access Private
const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (journal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized.");
  }

  await journal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getJournals,
  getJournal,
  setJournal,
  updateJournal,
  deleteJournal,
};
