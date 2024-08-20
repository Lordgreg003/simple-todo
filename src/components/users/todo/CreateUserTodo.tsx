import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CreateUserTodoAction } from "../../../redux/Actions/users/user todo/UserTodoAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../../redux/Store/store";

const CreateUserTodo = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true before dispatching

    try {
      await dispatch(CreateUserTodoAction({ username, email, title, text }));
      toast.success("Task created successfully!", { position: "top-center" });
      setTimeout(() => navigate("/user-dashboard/getall"), 3000); // Redirect to home page after 3 seconds

      // Clear form fields
      setUsername("");
      setEmail("");
      setTitle("");
      setText("");
    } catch (error) {
      toast.error("Error creating task. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false); // Set loading to false after operation
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Create New Task
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-600"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-semibold text-gray-600"
            >
              Text
            </label>
            <textarea
              id="text"
              rows={3}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg text-white font-bold shadow-lg transition duration-200 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              }`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/user-dashboard/getall"
            className="text-indigo-500 hover:text-indigo-700"
          >
            Back to List
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateUserTodo;
