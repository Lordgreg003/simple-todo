import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import {
  UserGetTodoByIdAction,
  UserUpdateTodoAction,
} from "../../../redux/Actions/users/user todo/UserTodoAction";
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThunkDispatch } from "redux-thunk";

const UserUpdateTodo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const location = useLocation();

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserTodoById
  );

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(UserGetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (serverResponse?.data) {
      setUsername(serverResponse.data.username || "");
      setEmail(serverResponse.data.email || "");
      setTitle(serverResponse.data.title || "");
    }
  }, [serverResponse]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(UserUpdateTodoAction({ username, email, title, id }));
      toast.success("User updated successfully!", { position: "top-center" });
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;
  if (error)
    return <div className="text-center text-red-400 mt-10">Error: {error}</div>;

  return (
    <section className="min-h-screen bg-gray-900 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-gray-800 shadow-lg rounded-lg p-8">
        <div className="mb-6 flex items-center">
          <Link
            to={location.state?.from || "/user-dashboard/getall"}
            className="text-blue-400 flex items-center hover:underline"
          >
            <IoIosArrowBack className="text-2xl mr-2" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-100 mb-8">Update User</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="border-gray-600 border-2 rounded-lg p-4 w-full bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-gray-600 border-2 rounded-lg p-4 w-full bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-gray-600 border-2 rounded-lg p-4 w-full bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-600 text-white border-2 border-blue-600 hover:bg-blue-700 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="submit"
            >
              Update Todo
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UserUpdateTodo;
