import AuthFooter from "../../components/layout/auth/AuthFooter";
import GetUserProfileById from "../../components/users/profile/GetUserProfileById";
const UserProfileScreen = () => {
  return (
    <div>
      <div className="">
        {/* <Sidebar /> */}
        <GetUserProfileById />
      </div>
      <AuthFooter />
    </div>
  );
};

export default UserProfileScreen;
