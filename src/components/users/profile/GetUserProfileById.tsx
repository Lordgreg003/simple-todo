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

  console.log("Profile Screen Params ID:", id);
  console.log("Profile Screen State:", { loading, error, serverResponse });

  useEffect(() => {
    if (id) {
      console.log("Dispatching GetUserProfileByIdAction...");
      dispatch(GetUserProfileByIdAction());
    }
  }, [dispatch, id]);

  const { data } = serverResponse || {};

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p>
            <strong>Name:</strong> {data?.name || "N/A"}
          </p>
          <p>
            <strong>Username:</strong> {data?.username || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {data?.email || "N/A"}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {data?.createdAt
              ? new Date(data.createdAt).toLocaleString()
              : "N/A"}
          </p>
          <p>
            <strong>Updated At:</strong>{" "}
            {data?.updatedAt
              ? new Date(data.updatedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfileScreen;
