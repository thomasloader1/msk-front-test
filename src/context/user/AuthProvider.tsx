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
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  const fetchUser = async () => {
    const res = await api.getUserData();
    if (!res.message) {
      localStorage.setItem(
        "user",
        JSON.stringify({ name: res.name, profession: res.contact.profession })
      );
      return res.data;
    } else {
      console.log(res.response.status);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (token && email) {
      fetchUser();
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
