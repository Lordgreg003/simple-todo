import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/auth/RegisterScreen";
import LoginScreen from "./screens/auth/LoginScreen";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        {/* <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/view/:id" element={<ViewTask />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
