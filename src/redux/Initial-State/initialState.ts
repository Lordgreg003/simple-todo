import { ReduxResponseType } from "../Types/todoTypes";

export const initialState: ReduxResponseType = {
  loading: false,
  success: false,
  serverResponse: {
    data: [],
    message: "",
    success: false,
  },
  error: "",
};
