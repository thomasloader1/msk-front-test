import React, { useEffect, useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./AuthReducer";
import { AuthState, Contact } from "data/types";
import api from "Services/api";
import { useHistory } from "react-router-dom";
interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    profile: null,
    entity_id_crm: null,
    email: null,
    token: null,
    expires_at: null,
    bypassRedirect: null,
    onRequest: null,

  };
const history = useHistory()
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch({ type: "SET_FETCH", payload: { onRequest: true} })
      try {
        const res = await api.getUserData();
        if (!res.message) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: res.name,
              speciality: res.contact.speciality,
              entity_id_crm: res.contact.entity_id_crm,
            })
          );
          localStorage.setItem(
            "userProfile",
            JSON.stringify({
              ...res.contact,
            })
          );
          localStorage.setItem("bypassRedirect", res.test);
          return {
            name: res.name,
            speciality: res.contact.speciality,
            profile: res.contact,
          };
        } else {
          console.log({auth:res.response.status});
          return null;
        }
      } catch (e) {
        console.error({ e });
        localStorage.removeItem("email");
        localStorage.removeItem("user");
        localStorage.removeItem("userProfile");
        dispatch({ type: "LOGOUT" });
        return null;
      }finally{
        dispatch({ type: "SET_FETCH", payload: { onRequest: false} })
      }
    };

    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      const bypassRedirect = localStorage.getItem("bypassRedirect");
      let expires_at: string | Date | null = localStorage.getItem("expires_at");

      if (token && email) {
        const userData = await fetchUserData();
        if (userData) {
          const data = {
            access_token: token,
            email,
            entity_id_crm: userData.profile.entity_id_crm,
            expires_at,
            bypassRedirect,
            user: userData,
            profile: userData.profile,
          };
          localStorage.setItem("userProfile", JSON.stringify(userData.profile));
          dispatch({ type: "LOGIN", payload: data });
          if (expires_at) {
            expires_at = new Date(expires_at);
            expires_at.setDate(expires_at.getDate() - 1);

            if (new Date() > expires_at) {
              dispatch({ type: "LOGOUT" });
            }
          }
        } else {
          console.log("No user data");
          history.push("/iniciar-sesion")
        }
      } else if (expires_at && new Date(expires_at) < new Date()) {
        dispatch({ type: "LOGOUT" });
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
