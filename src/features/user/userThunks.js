import { clearTokens } from "./userSlice";
import { apiSlice } from "../api/apiSlice";

export const logOut = () => (dispatch) => {
  dispatch(clearTokens());
  dispatch(apiSlice.util.resetApiState());
};
