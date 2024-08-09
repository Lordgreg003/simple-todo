import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../Constants/authConstants";
import { API_ROUTES } from "../Routes/routes";
import axios from "axios";
// import { ActionType } from "../Types/todoTypes";
import { LoginUserType, RegisterUserType } from "../Types/authTypes";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../Store/store";
import { Dispatch } from "redux";

// Register Action
export const registerUser =
  ({
    email,
    username,
    password,
  }: RegisterUserType): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES.Auth.register,
        { email, username, password },
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };

// Login Action
export const loginUser =
  ({
    username,
    password,
  }: LoginUserType): ThunkAction<void, RootState, unknown, any> =>
  async (dispatch: Dispatch, getState) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        API_ROUTES.Auth.login,
        { username, password },
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error?.response?.data?.message || error.message,
      });
    }
  };
