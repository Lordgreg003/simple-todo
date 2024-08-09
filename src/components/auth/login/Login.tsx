// LoginComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/Actions/authActions";
import { RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.loginUser
  );

  useEffect(() => {
    if (success) {
      setSuccessMessage("Login Successful!");
    }
  }, [success]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default LoginComponent;
