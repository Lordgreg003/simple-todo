import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/Store/store";
import { GetUserProfileByIdAction } from "../../redux/Actions/users/profile/UserProfileAction";
import Sidebar from "./sideBar";
import { AnyAction } from "redux";

const UserDashboard: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const { id } = useParams<{ id: string }>();

  // Selectors to get the state from the Redux store
  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );

  console.log("serverResponse", serverResponse);

  useEffect(() => {
    if (id) {
      console.log("Fetching user profile data with ID:", id);
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  const { data } = serverResponse || {};

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-8">
        <header className="bg-purple-600 p-4 text-white text-center text-xl rounded-md shadow-md">
          User Dashboard
        </header>
        <main className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-center">User Profile</h2>

          {loading ? (
            <div className="flex justify-center items-center h-full text-xl text-gray-700">
              Loading...
            </div>
          ) : error ? (
            <p className="text-red-300 text-center">{error}</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-600">Name:</strong>{" "}
                {data?.name || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-600">Username:</strong>{" "}
                {data?.username || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-600">Email:</strong>{" "}
                {data?.email || "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-600">Created At:</strong>{" "}
                {data?.createdAt
                  ? new Date(data.createdAt).toLocaleString()
                  : "N/A"}
              </p>
              <p className="text-lg font-semibold mb-2">
                <strong className="text-teal-600">Updated At:</strong>{" "}
                {data?.updatedAt
                  ? new Date(data.updatedAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          )}
        </main>
        <footer className="bg-gray-800 p-4 text-white text-center mt-8">
          © 2024 YourAppName
        </footer>
      </div>
    </div>
  );
};

export default UserDashboard;
