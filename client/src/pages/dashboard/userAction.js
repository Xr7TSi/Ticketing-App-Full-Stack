import { fetchUser } from "../../api/userAPI";
import { getUserPending, getUserSuccess, getUserFailure } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());

    const result = await fetchUser();

    if (result.user && result.user._id) {
      return dispatch(getUserSuccess(result.user));
    };
    dispatch(getUserFailure("User not found."));
  } catch (error) {
    dispatch(getUserFailure(error));
  };
};
