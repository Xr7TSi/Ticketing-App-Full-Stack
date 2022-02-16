import { otpReqPending, otpReqSuccess, updatePasswordSuccess, otpReqFailure } from "./passwordSlice";

import { reqPasswordOtp, updateUserPassword } from "../../api/passwordAPI";

// export const sendPasswordResetOtp = (email) => async (dispatch) => {
//   try {
//     dispatch(otpReqPending());

//     const result = await reqPasswordOtp(email);

//     result.status === "success" 
//     ? dispatch(otpReqSuccess(result.message))
//     : dispatch(otpReqFailure(result.message));

//   } catch (error) {
//     console.log("Error at sendPasswordResetOtp / " + error);
//     dispatch(otpReqFailure(error.message));
//   }
// };

export const sendPasswordResetOtp = email => async dispatch => {
  try {
    dispatch(otpReqPending());

    const { status, message } = await reqPasswordOtp(email);

    if (status === "success") {
      return dispatch(otpReqSuccess({ message , email}));
    }
    
    dispatch(otpReqFailure(message))

  } catch (error) {
    console.log("Error at sendPasswordResetOtp / " + error);
    dispatch(otpReqFailure(error.message));
  }
};

export const updatePassword = formData => async (dispatch) => {
  try {
    dispatch(otpReqPending());

    const result = await updateUserPassword(formData);

    result.status === "success" 
    ? dispatch(updatePasswordSuccess(result.message))
    : dispatch(otpReqFailure(result.message));

  } catch (error) {
    console.log("Error at updatePassword / " + error);
    dispatch(otpReqFailure(error.message));
  }
};
