import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store"; // Adjust the path accordingly
import {
  adminGetUserByIdAction,
  adminUpdateUserAction,
} from "../../../redux/Actions/admin/AdminuserActions";
import { IoIosArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThunkDispatch } from "redux-thunk";
import {
  AdminGetTodoByIdAction,
  AdminUpdateTodoAction,
} from "../../../redux/Actions/admin/AdmintodoActions";

const AdminUpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const location = useLocation();

  // Redux state for fetching user details
  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.adminGetByIdTodo
  );

  // Form state for fields to be updated
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  // Fetch data by ID when component mounts
  useEffect(() => {
    if (id) {
      dispatch(AdminGetTodoByIdAction(id));
    }
  }, [dispatch, id]);

  // Set form fields with existing user data when server response is available
  useEffect(() => {
    if (serverResponse?.data) {
      setUsername(serverResponse.data.username || "");
      setEmail(serverResponse.data.email || "");
      setTitle(serverResponse.data.title || "");
    }
  }, [serverResponse]);

  console.log("Server Response:", serverResponse);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      // Dispatch action to update user with the required fields
      dispatch(AdminUpdateTodoAction({ username, email, title, id }));
      toast.success("User updated successfully!", { position: "top-center" });
    }
  };

  // Conditional rendering for loading and error states
  if (loading)
    return <div className="text-center mt-10 text-blue-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-300 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6 flex items-center">
          <Link
            to={location.state?.from || "/admin-dashboard/getAlltodos"}
            className="text-blue-600 flex items-center hover:underline"
          >
            <IoIosArrowBack className="text-2xl mr-2" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Update User</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="border-gray-300 border-2 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-gray-300 border-2 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-gray-300 border-2 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
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
              Update User
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
};

export default AdminUpdateUser;
