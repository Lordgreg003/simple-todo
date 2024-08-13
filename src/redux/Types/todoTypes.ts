// src/types/reduxResponseTypes.ts
export type ReduxResponseType<T = any> = {
  loading: boolean;
  success: boolean;
  serverResponse: {
    data: T;
    message: string;
    success: boolean;
    // user: User | null; // Ensure User type is defined
  };
  error: any;
};

export type ActionType = {
  type: string;
  payload: any;
};
