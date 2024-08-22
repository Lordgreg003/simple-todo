import { AnyAction, Dispatch } from "redux";
import {
  GETBYID_PROFILE_REQUEST,
  GETBYID_PROFILE_SUCCESS,
  GETBYID_PROFILE_FAIL,
} from "../../../Constants/users/UserConstants";
import { RootState } from "../../../Store/store";
import { ReduxResponseType } from "../../../Types/todoTypes";
import axios from "axios";
import { API_ROUTES } from "../../../Routes/routes";
import { ThunkAction } from "redux-thunk";
import { LoginResponseType } from "../../../Types/authTypes";

type ThunkResult<R> = ThunkAction<R, RootState, unknown, AnyAction>;

export const GetUserProfileByIdAction =
  (): ThunkResult<void> => async (dispatch: Dispatch, getState: any) => {
    try {
      dispatch({
        type: GETBYID_PROFILE_REQUEST,
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

      const { data } = await axios.get(
        API_ROUTES.userProfile.getById + loginUser.serverResponse.data.id,
        config
      );

      dispatch({
        type: GETBYID_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      dispatch({
        type: GETBYID_PROFILE_FAIL,
        payload:
          error?.response && error.response?.data?.message
            ? error?.response?.data?.message
            : error?.message,
      });
    }
  };
