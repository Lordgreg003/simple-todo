// RegisterComponent.tsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../redux/Actions/authActions";
import { RootState } from "../../../redux/Store/store";
import { ThunkDispatch } from "redux-thunk";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch: ThunkDispatch<RootState, void, any> = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.registerUser
  );

  useEffect(() => {
    if (success) {
      setSuccessMessage("Registration Successful!");
    }
  }, [success]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ username, email, password }));
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
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
          Register
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default RegisterComponent;
