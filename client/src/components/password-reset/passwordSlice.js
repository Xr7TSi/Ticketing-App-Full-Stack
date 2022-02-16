import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  status: "",
  message: "",
  showUpdatePasswordForm: false,
  email: "",
};

const passwordReset = createSlice({
  name: "passwordReset",
  initialState,
  reducers: {
    otpReqPending: (state) => {
      state.isLoading = true;
    },
    otpReqSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload.message;
      state.email = payload.email;
      state.showUpdatePasswordForm = true;
    },
    updatePasswordSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.status = "success";
      state.message = payload.message;
    },
    otpReqFailure: (state, { payload }) => {
      state.isLoading = false;
      state.status = "error";
      state.message = payload.message;
    },
  },
});

const { reducer, actions } = passwordReset;

export const { otpReqPending, otpReqSuccess, updatePasswordSuccess, otpReqFailure } = actions;

export default reducer;
