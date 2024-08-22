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
  fieldToSecure: {
    id: string; // Add other fields if they exist
  };
  email: string;
  username?: string;
  type: "admin" | "user";
  token: string; // Include a token if needed for authentication
};
