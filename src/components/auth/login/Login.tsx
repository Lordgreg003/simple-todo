// src/screens/auth/LoginScreen.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/Actions/authActions";
import { ReducersType, RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";
import { ReduxResponseType } from "../../../redux/Types/todoTypes";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  // Extract state from Redux store
  const { loading, error, success, serverResponse } = useSelector(
    (state: ReducersType) => state?.loginUser
  ) as ReduxResponseType;

  useEffect(() => {
    if (success && serverResponse) {
      // Display success message
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 3000,
        text: serverResponse?.message,
      });

      // Handle role-based navigation
      const token = serverResponse?.data?.token;
      // console.log(token);

      if (token) {
        try {
          // Decode the token to extract user information
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          // console.log("Decoded token:", decodedToken);

          // Assuming the role might be nested within 'fieldToSecure'
          const userRole = decodedToken?.fieldToSecure?.type; // Adjust based on the actual structure of the token
          // console.log("User role:", userRole);

          if (userRole) {
            if (userRole === "admin") {
              navigate("/admin-dashboard");
            } else if (userRole === "user") {
              navigate("/user-dashboard");
            }
          } else {
            console.log("User role is undefined.");
          }
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.log("Token is undefined or null.");
      }

      // Reset form data
      setUsername("");
      setPassword("");
    } else if (error) {
      // Display error message
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: error,
      });
    }
  }, [success, navigate, serverResponse, error]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAction({ username, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 disabled:opacity-50"
          >
            {loading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {loading && (
          <p className="text-center text-blue-500 mt-4">Loading...</p>
        )}
        {error && (
          <p className="text-center text-red-500 mt-4">Error: {error}</p>
        )}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link to={"/register"} className="text-purple-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
