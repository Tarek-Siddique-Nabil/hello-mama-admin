import { useContext } from "react";

import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./useFirebase";

const RequireAuth = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const storeUser = localStorage.getItem("User email");
  const location = useLocation();
  if (!storeUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return children;
  }
};

export default RequireAuth;
