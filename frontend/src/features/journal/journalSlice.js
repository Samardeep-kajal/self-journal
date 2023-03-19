import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import journalService from "./journalService";

const initialState = {
  journals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Creating a new journal
export const createJournal = createAsyncThunk(
  "journals/create",
  async (journalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.createJournal(journalData, token);
    } catch (error) {
      const message =
        (error.response && error.reponse.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user journals
export const getJournals = createAsyncThunk(
  "journals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.getJournals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Deleting user Journal
export const deleteJournal = createAsyncThunk(
  "journals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await journalService.deleteJournal(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//creating journal Slice
export const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJournal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals.push(action.payload);
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getJournals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getJournals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals = action.payload;
      })
      .addCase(getJournals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteJournal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteJournal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journals = state.journals.filter(
          (journal) => journal._id !== action.payload.id
        );
      })
      .addCase(deleteJournal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = journalSlice.actions;
export default journalSlice.reducer;
