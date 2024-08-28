import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { GetUserProfileByIdAction } from "../../../redux/Actions/users/profile/UserProfileAction";
import { ThunkDispatch } from "redux-thunk";
import { useNavigate } from "react-router-dom";

const ProfileScreen: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );

  const data = useMemo(() => {
    return serverResponse?.data;
  }, [serverResponse]);

  useEffect(() => {
    dispatch(GetUserProfileByIdAction());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-900 p-6">
      <div className="container mx-auto max-w-4xl p-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          User Profile
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-full text-xl text-gray-400">
            Loading...
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300">
            <p className="text-lg font-semibold mb-2 text-white">
              <strong className="text-teal-400">Name:</strong>{" "}
              {data?.name || "N/A"}
            </p>
            <p className="text-lg font-semibold mb-2 text-white">
              <strong className="text-teal-400">Username:</strong>{" "}
              {data?.username || "N/A"}
            </p>
            <p className="text-lg font-semibold mb-2 text-white">
              <strong className="text-teal-400">Email:</strong>{" "}
              {data?.email || "N/A"}
            </p>
            <p className="text-lg font-semibold mb-2 text-white">
              <strong className="text-teal-400">Created At:</strong>{" "}
              {data?.createdAt
                ? new Date(data.createdAt).toLocaleString()
                : "N/A"}
            </p>
            <p className="text-lg font-semibold mb-2 text-white">
              <strong className="text-teal-400">Updated At:</strong>{" "}
              {data?.updatedAt
                ? new Date(data.updatedAt).toLocaleString()
                : "N/A"}
            </p>
            {/* Go Back Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => navigate(-1)}
                className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300"
              >
                Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
