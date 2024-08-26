import { AnyAction, Dispatch } from "redux";
import {
  GETBYID_PROFILE_REQUEST,
  GETBYID_PROFILE_SUCCESS,
  GETBYID_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCESS,
  UPDATE_PROFILE_FAIL,
} from "../../../Constants/users/UserConstants";
import { RootState } from "../../../Store/store";
import { ReduxResponseType } from "../../../Types/todoTypes";
import axios from "axios";
import { API_ROUTES } from "../../../Routes/routes";
import { ThunkAction } from "redux-thunk";
import { LoginResponseType } from "../../../Types/authTypes";
import { UpdateProfiletype } from "../../../Types/user/userTypes";

type ThunkResult<R> = ThunkAction<R, RootState, unknown, AnyAction>;

export const GetUserProfileByIdAction =
  (id: string): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      console.log("GetUserProfileByIdAction initiated");

      // Dispatch request action
      dispatch({
        type: GETBYID_PROFILE_REQUEST,
      });

      // Log the current state
      const state = getState();
      console.log("Current state:", state);

      // Extract token from the state
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;
      const userId = loginUser?.serverResponse?.data?.fieldToSecure.id;

      // Log the extracted token and userId
      console.log("Extracted token:", token);
      console.log("Extracted UserId:", userId);

      // Additional check to ensure userId is not undefined
      if (!userId) {
        console.error("UserId is undefined! Please check the login state.");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      // Log the API request URL and config
      console.log(
        "API request URL:",
        `${API_ROUTES.userProfile.getById}${userId}`,
        config
      );
      console.log("Request config:", config);

      const { data } = await axios.get(
        `${API_ROUTES.userProfile.getById}${id}`,
        config
      );

      // Log the API response data
      console.log("API response data:", data);

      // Dispatch success action
      dispatch({
        type: GETBYID_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // Log the error response
      console.error("Error response:", error);

      dispatch({
        type: GETBYID_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };

export const UpdateProfileAction =
  ({ username, email, name, id }: UpdateProfiletype): ThunkResult<void> =>
  async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: UPDATE_PROFILE_REQUEST,
      });

      const state = getState();
      const loginUser: ReduxResponseType<LoginResponseType> = state?.loginUser;
      const token = loginUser?.serverResponse?.data?.token;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ROUTES.userProfile.update}${id}`,
        { name, username, email },
        config
      );

      dispatch({
        type: UPDATE_PROFILE_SUCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
