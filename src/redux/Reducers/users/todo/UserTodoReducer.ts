import { LOGIN_RESET } from "../../../Constants/authConstants";
import {
  UPDATE_USER_TODO_REQUEST,
  UPDATE_USER_TODO_SUCCESS,
  UPDATE_USER_TODO_FAIL,
  UPDATE_USER_TODO_RESET,
} from "../../../Constants/users/UserConstants";
import { initialState } from "../../../Initial-State/initialState";
import { ActionType, ReduxResponseType } from "../../../Types/todoTypes";

export const UpdateUserTodoReducer = (
  state: ReduxResponseType = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case UPDATE_USER_TODO_REQUEST:
      return { ...initialState, loading: true };
    case UPDATE_USER_TODO_SUCCESS:
      return {
        ...initialState,
        loading: false,
        success: true,
        serverResponse: action.payload,
      };
    case UPDATE_USER_TODO_FAIL:
      return {
        ...initialState,
        loading: false,
        success: false,
        error: action.payload,
      };
    case UPDATE_USER_TODO_RESET:
    case LOGIN_RESET:
      return { ...initialState };

    default:
      return state;
  }
};
