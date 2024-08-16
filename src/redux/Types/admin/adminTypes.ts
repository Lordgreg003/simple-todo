export type AdminGetTodoType = {
  _id: string;
  username: string;
  email: string;
  title: string;
  status: boolean;
  createdAt: string;
};

export type adminCreateUserType = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type adminUpdateTodoType = {
  name: string;
  username: string;
  email: string;
  password: string;
  id?: string;
};
