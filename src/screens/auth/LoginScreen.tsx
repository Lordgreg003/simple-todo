import Login from "../../components/auth/login/Login";
import AuthNav from "../../components/layout/auth/AuthNav";
import AuthFooter from "../../components/layout/auth/AuthFooter";

const LoginScreen = () => {
  return (
    <div>
      <AuthNav />
      <Login />
      <AuthFooter />{" "}
    </div>
  );
};

export default LoginScreen;
