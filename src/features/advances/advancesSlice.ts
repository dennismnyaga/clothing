/* eslint-disable prettier/prettier */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import getApiUrl from "../../../getApiUrl"



interface Advance {
  id: number;
  employee: number;
  amount: string;
  date_issued: string;
  date_given: string;
}


const apiUrl = getApiUrl()
// Define the allowed values for status
type Status = "idle" | "loading" | "succeeded" | "failed";

// Extend the AdvancesState interface
interface AdvancesState {
  advance: Advance[];
  status: Status; // For general actions like fetching Advance
  error: string | null | undefined; // General error state

  // New properties for addAdvance specific state
  addAdvanceStatus: Status; // Specifically for addAdvance loading state
  addAdvanceError: string | null | undefined; // Specifically for addAdvance error state

  updateAdvanceStatus: Status;
  updateAdvanceError: string | null | undefined;


  deleteAdvanceStatus: Status;
  deleteAdvanceError: string | null | undefined;



}

// Define the initial state according to the updated interface
const initialState: AdvancesState = {
  advance: [],
  status: "idle", // Default general status
  error: null, // Default error state

  // Initialize new state properties for addAdvance
  addAdvanceStatus: "idle", // Default state for adding Advance
  addAdvanceError: null, // No error initially for addAdvance

  updateAdvanceStatus: 'idle',
  updateAdvanceError: null,

  deleteAdvanceStatus: 'idle',
  deleteAdvanceError: null,

};







export const fetchAdvances = createAsyncThunk("advances/fetchAdvances", async () => {
  const response = await axios.get<Advance[]>(`${apiUrl}/advances/`);
  return response.data;
});





export const updateAdvances = createAsyncThunk(
  "advance/updateAdvances",
  async ({ id, updatedData }: { id: number; updatedData: Partial<Advance> }) => {
    const response = await axios.put(`${apiUrl}/updateAdvances/${id}/`, updatedData); // Assuming you're using PUT to update
    return response.data;
  }
);


export const deleteAdvance = createAsyncThunk(
  "advance/deleteAdvance",
  async ({
    advanceId
  }: {
    advanceId: any
  }) => {

    const response = await axios.delete(`${apiUrl}/deleteEmployee/${advanceId}/`)
    return response.data
  },
)





export const addAdvance = createAsyncThunk(
  "Advance/addAdvance",
  async (formData
  ) => {
    const response = await axios.post(`${apiUrl}/addAdvance/`, formData)
    return response.data
  }
)



const advancesSlice = createSlice({
  name: "advance",
  initialState,
  reducers: {
    productAdded: (state, action: PayloadAction<Advance>) => {
      state.advance.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAdvance.pending, (state) => {
        state.addAdvanceStatus = 'loading';
      })
      .addCase(addAdvance.fulfilled, (state, action) => {
        state.addAdvanceStatus = 'succeeded'
        state.addAdvanceError = null;
        state.advance = [action.payload, ...state.advance]
      })
      .addCase(addAdvance.rejected, (state) => {
        state.addAdvanceError = 'failed'
      })
      .addCase(updateAdvances.pending, (state) => {
        state.updateAdvanceStatus = "loading";
      })
      .addCase(updateAdvances.fulfilled, (state, action: PayloadAction<Advance>) => {
        state.updateAdvanceStatus = "succeeded";
        // Update the specific Advance in the array
        state.advance = state.advance.map((advance) =>
          advance.id === action.payload.id ? action.payload : advance
        );
      })
      .addCase(updateAdvances.rejected, (state, action) => {
        state.updateAdvanceStatus = "failed";
        state.updateAdvanceError = action.error.message;
      })
      .addCase(fetchAdvances.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdvances.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.advance = action.payload;
      })
      .addCase(fetchAdvances.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(deleteAdvance.pending, (state, action) => {
        state.deleteAdvanceStatus = "loading"
      })
      .addCase(deleteAdvance.fulfilled, (state, action) => {
        console.log('Success')
        state.deleteAdvanceStatus = 'succeeded'
        state.advance = state.advance.filter(advance => advance.id !== action.meta.arg.advanceId);
      })
      .addCase(deleteAdvance.rejected, (state, action) => {
        state.deleteAdvanceStatus = 'failed';
        state.deleteAdvanceError = action.error.message
      })

  },
});

export const selectAllAdvances = (state: { advance: AdvancesState }) => state.advance.advance;
export const getAdvancesStatus = (state: { advance: AdvancesState }) => state.advance.status;
export const getAdvancesError = (state: { advance: AdvancesState }) => state.advance.error;

export default advancesSlice.reducer;
