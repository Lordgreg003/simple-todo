import {
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_RESET,
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Constants/authConstants";
import { API_ROUTES } from "../Routes/routes";
import axios from "axios";
// import { ActionType } from "../Types/todoTypes";
import {
  LoginResponseType,
  LoginUserType,
  RegisterUserType,
} from "../Types/authTypes";
// import { ThunkAction } from "redux-thunk";
// import { RootState } from "../Store/store";
import { Dispatch } from "redux";
import { ReduxResponseType } from "../Types/todoTypes";
import { RootState } from "../Store/store";

// Register Action
export const registerAction =
  ({ name, email, password, username }: RegisterUserType) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Use API_ROUTES to get the endpoint for registration
      const { data } = await axios.post(
        API_ROUTES.auth.register,
        { name, email, password, username },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

// Login Action
export const loginAction =
  ({ username, password }: LoginUserType) =>
  async (dispatch: Dispatch) => {
    try {
      console.log("Login action initiated with:", { username, password });

      dispatch({
        type: LOGIN_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log("Sending login request to:", API_ROUTES.auth.login);

      const { data } = await axios.post(
        API_ROUTES.auth.login,
        { username, password },
        config
      );

      console.log("Login successful, received data:", data);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      console.error("Login failed:", error);

      dispatch({
        type: LOGIN_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const logoutAction =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    // Extract the token from the Redux state
    const state = getState();
    const loginUser = state.loginuser; // Adjust if necessary
    const token = loginUser?.serverResponse?.data?.token;

    console.log("Logging out, token:", token);

    // Clear the token from local storage
    localStorage.removeItem("token"); // Ensure this matches where you store the token
    // If you're using cookies, clear them as well

    // Verify that the token has been removed
    console.log("Token after removal:", localStorage.getItem("token"));

    // Dispatch an action to reset authentication state
    dispatch({ type: LOGIN_RESET });

    // Optionally, you might want to redirect or perform additional cleanup here
  };
