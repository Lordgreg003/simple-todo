// src/screens/user/ProfileScreen.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store/store";
import { GetUserProfileByIdAction } from "../../../redux/Actions/users/profile/UserProfileAction";
import { useParams } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";

const ProfileScreen: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { id } = useParams<{ id: string }>();

  const { loading, error, serverResponse } = useSelector(
    (state: RootState) => state.getUserProfile
  );

  useEffect(() => {
    if (id) {
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  const { data } = serverResponse || {};

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
      </div>
    </div>
  );
};

export default ProfileScreen;
