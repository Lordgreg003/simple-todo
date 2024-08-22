import { LOGIN_RESET } from "../../../Constants/authConstants";
import {
  GETBYID_PROFILE_REQUEST,
  GETBYID_PROFILE_SUCCESS,
  GETBYID_PROFILE_FAIL,
  GETBYID_PROFILE_RESET,
} from "../../../Constants/users/UserConstants";
import { initialState } from "../../../Initial-State/initialState";
import { ActionType, ReduxResponseType } from "../../../Types/todoTypes";

export const GetProfileByIdReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  console.log("Reducer Action:", action.type);

  switch (action.type) {
    case GETBYID_PROFILE_REQUEST:
      console.log("Profile Fetching Started...");
      return { ...initialState, loading: true };
    case GETBYID_PROFILE_SUCCESS:
      console.log("Profile Fetching Success:", action.payload);
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload.data,
      };
    case GETBYID_PROFILE_FAIL:
      console.log("Profile Fetching Failed:", action.payload);
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case GETBYID_PROFILE_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
