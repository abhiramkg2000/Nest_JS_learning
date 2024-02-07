import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { ReactElement, ReactNode, useEffect } from "react";

type ProtectedProps = {
  children: ReactElement;
};

function AuthenticatedRoute({ children }: ProtectedProps) {
  const access_token = useAppSelector((state) => state.login.user_login);
    // console.log("a", access_token?.access_token);

  //   useEffect(() => {
  //     console.log(access_token);
  //   }, [access_token]);

  if (access_token) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default AuthenticatedRoute;
