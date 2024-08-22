// src/screens/user/UserDashboard.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/Store/store";
import { UserProfiletype } from "../../redux/Types/user/userTypes";
import { GetUserProfileByIdAction } from "../../redux/Actions/users/profile/UserProfileAction";
import Sidebar from "./sideBar";
import { AnyAction } from "redux";
import { ReduxResponseType } from "../../redux/Types/todoTypes";

const UserDashboard: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, void, AnyAction> = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [userProfile, setUserProfile] = useState<UserProfiletype | null>(null);
  const [message, setMessage] = useState<string>("");

  const { loading, serverResponse, error } = useSelector(
    (state: RootState) => state.getUserProfile
  ) as ReduxResponseType<UserProfiletype>;

  useEffect(() => {
    if (id) {
      dispatch(GetUserProfileByIdAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (serverResponse) {
      setUserProfile(serverResponse.data);
      setMessage("");
    } else if (error) {
      setMessage("Error fetching user profile.");
    }
  }, [serverResponse, error]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow bg-gray-200 p-8">
        <header className="bg-purple-600 p-4 text-white text-center text-xl rounded-md shadow-md">
          User Dashboard
        </header>
        <main className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-6">User Profile</h2>

          {message && (
            <div className="mb-4 p-4 bg-blue-100 text-blue-700 rounded-lg">
              {message}
            </div>
          )}

          {userProfile ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-lg font-semibold">
                  <strong>Username:</strong> {userProfile.username}
                </p>
                <p className="text-lg font-semibold">
                  <strong>Email:</strong> {userProfile.email}
                </p>
                <p className="text-lg font-semibold">
                  <strong>Joined:</strong>{" "}
                  {new Date(userProfile.createdAt).toLocaleString()}
                </p>
                {/* Add more fields as needed */}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-700">
              No user profile data available.
            </p>
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
