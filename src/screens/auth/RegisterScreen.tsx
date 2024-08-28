import Register from "../../components/auth/register/Register";
import AuthFooter from "../../components/layout/auth/AuthFooter";
import AuthNav from "../../components/layout/auth/AuthNav";
const RegisterScreen = () => {
  return (
    <div>
      <AuthNav />
      <Register />
      <AuthFooter />
    </div>
  );
};

export default RegisterScreen;
