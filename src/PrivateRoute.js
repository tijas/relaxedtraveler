import React from "react";
import { Navigate, useLocation} from "react-router-dom";
import { useAuth } from "./context/auth";

function PrivateRoute({ children }) {
  const {authTokens} = useAuth();
  const location = useLocation();

  return authTokens ? children :<Navigate to="/login" state= { location } replace={true}/>
}

export default PrivateRoute;