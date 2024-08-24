import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../../redux/Actions/authActions";
import { ReducersType, RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PulseLoader from "react-spinners/PulseLoader";
import { ReduxResponseType } from "../../../redux/Types/todoTypes";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Importing eye icons

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Local loading state
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success, serverResponse } = useSelector(
    (state: ReducersType) => state?.loginUser
  ) as ReduxResponseType;

  useEffect(() => {
    if (success && serverResponse) {
      Swal.fire({
        icon: "success",
        title: "Successful",
        timer: 3000,
        text: serverResponse?.message,
      });

      const token = serverResponse?.data?.token;

      if (token) {
        try {
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const userRole = decodedToken?.fieldToSecure?.type;

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

      setUsername("");
      setPassword("");
      setIsLoading(false); // Reset loading state
    } else if (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        timer: 5000,
        text: error,
      });
      setIsLoading(false); // Reset loading state
    }
  }, [success, navigate, serverResponse, error]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state
    dispatch(loginAction({ username, password }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 text-white font-bold rounded-md hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 transition duration-300 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="" style={{ height: "25px" }}>
                <PulseLoader color="#ffffff" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
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
