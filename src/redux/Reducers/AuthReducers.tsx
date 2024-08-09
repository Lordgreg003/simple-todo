import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_RESET,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
} from "../Constants/authConstants"; // Adjust the import path as needed
import { ReduxResponseType, ActionType } from "../Types/todoTypes"; // Adjust the import path as needed
import { initialState } from "../Initial-State/initialState"; // Adjust the import path as needed

export const registerUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...initialState, loading: true };
    case REGISTER_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case REGISTER_FAILURE:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case REGISTER_RESET:
      return { ...initialState };
    default:
      return state;
  }
};

export const loginUserReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...initialState, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case LOGIN_RESET:
      return { ...initialState };
    default:
      return state;
  }
};
