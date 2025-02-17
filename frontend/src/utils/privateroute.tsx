import { Navigate, Outlet } from "react-router-dom";
import { checkTokenValidity } from "./authUtils";

const PrivateRoute = () => {
  const authToken = localStorage.getItem("authToken");
  console.log("Auth: ", authToken);

  if (authToken && checkTokenValidity(authToken)) {
    // If the token is valid, render the protected routes
    return <Outlet />;
  } else {
    localStorage.removeItem("authToken");
    return <Navigate to="/login" />;
  }
};
export default PrivateRoute;