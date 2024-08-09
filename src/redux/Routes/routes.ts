const BASE = "https://chalynyx-todo-backend.onrender.com/api";

export const API_ROUTES = {
  // Authentication
  Auth: {
    register: BASE + "/register/user", // POST
    login: BASE + "/login/user", // POST
  },
  // User
  Todo: {
    create: BASE + "/todo/create", // POST
    update: BASE + "/update/todo/", // PUT :id
    delete: BASE + "/delete/todo/", // DELETE :id
    getByID: BASE + "/getbyid/todo/", // GET :id
    getAll: BASE + "/getall/todo/", // GET
  },
};
