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

const AdminUpdateUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const location = useLocation();
  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.adminGetByIduser
  );

  // Form state
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  // Fetch data by ID when component mounts
  useEffect(() => {
    if (id) {
      dispatch(adminGetUserByIdAction(id));
    }
  }, [dispatch, id]);

  // Set form fields with existing task data when server response is available
  useEffect(() => {
    if (serverResponse?.data) {
      setUsername(serverResponse.data.username || "");
      setEmail(serverResponse.data.email || "");
      setName(serverResponse.data.name || "");
      setPassword(serverResponse.data.password || "");
    }
  }, [serverResponse]);

  console.log(serverResponse);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      dispatch(adminUpdateUserAction({ name, email, password, username, id }));
      toast.success("User updated successfully!", { position: "top-center" });
    }
  };

  // Conditional rendering
  if (loading)
    return <div className="text-center mt-10 text-blue-600">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <section className="min-h-screen bg-gradient-to-r from-blue-200 via-purple-300 to-pink-300 flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6 flex items-center">
          <Link
            to={location.state?.from || "/admin-dashboard/manage-users"}
            className="text-blue-600 flex items-center hover:underline"
          >
            <IoIosArrowBack className="text-2xl mr-2" />
            <span className="text-lg font-semibold">Back</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-center mb-8">Update Task</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              className="border-gray-300 border-2 rounded-lg p-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
