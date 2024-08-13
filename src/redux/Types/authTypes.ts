export type RegisterUserType = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type LoginUserType = {
  username: string;
  password: string;
};
export type LoginResponseType = {
  id: string;
  email: string;
  username?: string;
  type: "admin" | "user";
  token: string; // Include a token if needed for authentication
};
