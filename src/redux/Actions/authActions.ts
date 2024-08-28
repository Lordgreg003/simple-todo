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
import { LOGIN_SESSION } from "../../extrastorage/storageStore";

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

export const logoutAction = () => async (dispatch: Dispatch) => {
  dispatch({ type: LOGIN_RESET });

  // Clear the login session from localStorage
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(LOGIN_SESSION);
  }
};
