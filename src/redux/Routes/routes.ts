const BASE = "https://chalynyx-todo-backend.onrender.com";

// API routes based on Swagger documentation
export const API_ROUTES = {
  // Authentication
  auth: {
    register: BASE + "/api/register/user", // POST
    login: BASE + "/api/login/user", // POST
  },

  // Admin Users Management
  adminUsers: {
    create: BASE + "/api/admin/create/user", // POST
    update: BASE + "/api/admin/update/user/", // PUT :id
    delete: BASE + "/api/admin/delete/user/", // DELETE :id
    getById: BASE + "/api/admin/getbyid/user/", // GET :id
    getAll: BASE + "/api/admin/getall/user", // GET
  },

  // Admin Todo Management
  adminTodos: {
    create: BASE + "/api/admin/create/todo", // POST
    update: BASE + "/api/admin/update/todo/", // PUT :id
    delete: BASE + "/api/admin/delete/todo/", // DELETE :id
    getById: BASE + "/api/admin/getbyid/todo/", // GET :id
    getAll: BASE + "/api/admin/getall/todo", // GET
  },

  // User Profile
  userProfile: {
    update: BASE + "/api/update/user/", // PUT :id
    getById: BASE + "/api/getbyid/user/", // GET :id
  },

  // User Todo
  userTodos: {
    create: BASE + "/api/todo/create", // POST
    update: BASE + "/api/update/todo/", // PUT :id
    delete: BASE + "/api/delete/todo/", // DELETE :id
    getById: BASE + "/api/getbyid/todo/", // GET :id
    getAll: BASE + "/api/getall/todo", // GET
  },
};
