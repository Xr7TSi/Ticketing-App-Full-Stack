import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: "",
  successMsg: "",
};

const newTicketSlice = createSlice({
  name: "newTicket",
  initialState,
  reducers: {
    openNewTicketPending: (state) => {
      state.isLoading = true;
    },
    openNewTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.successMsg = action.payload
    },
    openNewTicketFailure: (state, action) => {
      state.isLoading = true;
      state.error = action.payload
    },
    resetSuccessMsg: (state) => {
      state.isLoading = false;
      state.successMsg = ""
    },
  },
});

export const {
    openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFailure,
    resetSuccessMsg,
} = newTicketSlice.actions
export default newTicketSlice.reducer;

