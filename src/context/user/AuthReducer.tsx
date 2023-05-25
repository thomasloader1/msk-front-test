import { AuthState, AuthAction } from "data/types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("email", action.payload.email);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        email: action.payload.email,
        token: action.payload.access_token,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
        token: null,
      };
    default:
      return state;
  }
};
