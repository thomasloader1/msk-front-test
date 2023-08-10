import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { AuthState } from "data/types";
import api from "Services/api";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    email: null,
    token: null,
    expires_at: null,
    bypassRedirect: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const fetchUser = async () => {
    const res = await api.getUserData();
    if (!res.message) {
      localStorage.setItem(
        "user",
        JSON.stringify({ name: res.name, speciality: res.contact.speciality })
      );
      localStorage.setItem("bypassRedirect", res.test);
      return res.data;
    } else {
      console.log(res.response.status);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const bypassRedirect = localStorage.getItem("bypassRedirect");
    let expires_at: string | Date | null = localStorage.getItem("expires_at");

    if (token && email) {
      fetchUser();
      const data = { access_token: token, email, expires_at, bypassRedirect };
      dispatch({ type: "LOGIN", payload: data });

      if (expires_at) {
        expires_at = new Date(expires_at);
        expires_at.setDate(expires_at.getDate() - 1);

        if (new Date() > expires_at) {
          dispatch({ type: "LOGOUT" });
        }
      }
    } else if (expires_at && new Date(expires_at) < new Date()) {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
