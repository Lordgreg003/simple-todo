import { redirect } from "react-router-dom";
import { LOGIN_SESSION } from "../extrastorage/storageStore";
import { logoutAction } from "../redux/Actions/authActions";

export const homeCheck = async () => {
  return null;
};

export const authCheck = async () => {
  const storedData = localStorage.getItem(LOGIN_SESSION);

  if (!storedData) {
    return null; // No stored session data, so no redirect.
  }

  const parsedData = JSON.parse(storedData);

  if (parsedData?.serverResponse?.data?.type === "user") {
    return redirect("/dashboard"); // Redirect user to the dashboard.
  } else if (parsedData?.serverResponse?.data?.type === "admin") {
    return redirect("/admin/dashboard"); // Redirect admin to the admin dashboard.
  } else {
    // If the user type is not recognized or is invalid:
    logoutAction(); // Dispatch logout action to clear session
    return redirect("/login"); // Redirect to the login page.
  }
};
