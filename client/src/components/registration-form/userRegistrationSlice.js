import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
};

const userRegistrationSlice = createSlice({
  name: "userRegistration",
  initialState,
  reducers: {
    registrationPending: (state) => {
      state.isLoading = true;
    },
    registrationSuccess: (state, action) => {
      state.isLoading = false;
      state.status = "success";
      state.message = action.payload;
    },
    registrationFailure: (state, action) => {
      state.isLoading = false;
      state.status = "error";
      state.message = action.payload;
    },
  },
});

const { reducer, actions } = userRegistrationSlice;

export const {
    registrationPending,
    registrationSuccess,
    registrationFailure
} = actions;

export default reducer;
