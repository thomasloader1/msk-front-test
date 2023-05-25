import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { AuthState, AuthAction } from "data/types";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    email: null,
    token: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      const data = { access_token: token, email };
      dispatch({ type: "LOGIN", payload: data });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
