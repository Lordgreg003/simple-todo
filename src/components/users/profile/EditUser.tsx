import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import {
  GetUserProfileByIdAction,
  UpdateProfileAction,
} from "../../../redux/Actions/users/profile/UserProfileAction";
import { ThunkDispatch } from "redux-thunk";

const ProfileScreen: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false); // New state for button loading

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );

  const { success: updateSuccess, error: updateError } = useSelector(
    (state: RootState) => state.updateUserTodo
  );

  const data = useMemo(() => {
    return serverResponse?.data;
  }, [serverResponse]);

  useEffect(() => {
    dispatch(GetUserProfileByIdAction());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setUsername(data.username || "");
      setEmail(data.email || "");
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingUpdate(true); // Set loading to true when submitting
    await dispatch(UpdateProfileAction({ name, username, email }));
    setLoadingUpdate(false); // Set loading to false after dispatch is complete
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-6">
      <div className="container mx-auto max-w-4xl p-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          User Profile
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-full text-xl text-white">
            Loading...
          </div>
        ) : error ? (
          <p className="text-red-300 text-center">{error}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300"
          >
            {updateSuccess && (
              <p className="text-green-500 text-center mb-4">
                Profile updated successfully!
              </p>
            )}
            {updateError && (
              <p className="text-red-500 text-center mb-4">{updateError}</p>
            )}
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Name:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-semibold mb-2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700 flex items-center justify-center"
              disabled={loadingUpdate} // Disable button while loading
            >
              {loadingUpdate ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6h2zm0 0a8 8 0 008 8v-2a6 6 0 01-6-6h2z"
                  />
                </svg>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
