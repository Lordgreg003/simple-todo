import React from "react";
import Userdashboard from "../../components/users/DashBoard";
import AuthFooter from "../../components/layout/auth/AuthFooter";

const UserDashboard = () => {
  return (
    <div>
      <Userdashboard />
      <AuthFooter />
    </div>
  );
};

export default UserDashboard;
