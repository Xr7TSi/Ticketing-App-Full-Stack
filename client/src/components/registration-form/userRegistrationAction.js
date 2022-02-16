import {
  registrationPending,
  registrationSuccess,
  registrationFailure,
} from "./userRegistrationSlice";
import { userRegistration } from "../../api/userAPI";

export const newUserRegistration = (formData) => async (dispatch) => {
  dispatch(registrationPending());
  try {
    const result = await userRegistration(formData);

    result.status === "success" 
    ? dispatch(registrationSuccess(result.message))
    : dispatch(registrationFailure(result.message));

  } catch (error) {
    dispatch(registrationFailure(error.message));
    console.log("Error at userRegistration / " + error.message);
  }
};
