import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileByIdAction } from "../../../redux/Actions/users/profile/UserProfileAction";
import { RootState } from "../../../redux/Store/store";
import { useParams } from "react-router-dom";

const UserProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  const {
    loading,
    error,
    serverResponse: userProfile,
  } = useSelector((state: RootState) => state.getUserProfile);

  useEffect(() => {
    if (id) {
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        userProfile && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
            <p>
              <strong>Name:</strong> {userProfile.data.name}
            </p>
            <p>
              <strong>Username:</strong> {userProfile.data.username}
            </p>
            <p>
              <strong>Email:</strong> {userProfile.data.email}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(userProfile.data.createdAt).toLocaleDateString()}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfileScreen;
