import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  tickets: [],
  isLoading: false,
  error: "",
  replyTicketError: "",
  searchTicketList: [],
  selectedTicket: {},
};

const ticketListSlice = createSlice({
  name: "ticketList",
  initialState,
  reducers: {
    fetchTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchTicketSuccess: (state, action) => {
      state.tickets = action.payload;
      state.searchTicketList = action.payload;
      state.isLoading = false;
    },
    fetchTicketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetReplyMsg: (state, action) => {
      state.isLoading = false;
      state.replyMsg = "";
    },
    searchTickets: (state, action) => {
      state.searchTicketList = state.tickets.filter((row) => {
        if (!action.payload) return row;

        return row.subject.toLowerCase().includes(action.payload.toLowerCase());
      });
    },

    fetchSingleTicketLoading: (state) => {
      state.isLoading = true;
    },
    fetchSingleTicketSuccess: (state, action) => {
      state.selectedTicket = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    fetchSingleTicketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    replyTicketLoading: (state) => {
      state.isLoading = true;
    },
    replyTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = action.payload;

    },
    replyTicketFailure: (state, action) => {
      state.isLoading = false;
      state.replyTicketError = action.payload;
    },

    closeTicketLoading: (state) => {
      state.isLoading = true;
    },
    closeTicketSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.replyMsg = action.payload;
    },
    closeTicketFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer, actions } = ticketListSlice;

export const {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFailure,
  resetReplyMsg,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFailure,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFailure,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFailure,
} = actions;

export default reducer;
