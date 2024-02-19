import { AuthState, AuthAction } from "data/types";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const FRESH = "FRESH";
const UPDATE_PROFILE = "UPDATE_PROFILE";
const UPDATE_COURSES = "UPDATE_COURSES";
const SET_FETCH = "SET_FETCH";

export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("email", action.payload.email);
      localStorage.setItem("expires_at", action.payload.expires_at);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.user.name,
          speciality: action.payload.user.speciality,
        })
      );
      localStorage.setItem("userProfile",JSON.stringify({...action.payload.profile}));
      const user = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: true,
        user: user ? JSON.parse(user) : null,
        profile: action.payload.profile,
        email: action.payload.email,
        token: action.payload.access_token,
        expires_at: action.payload.expires_at,
        bypassRedirect: action.payload.test,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("user");
      localStorage.removeItem("userProfile");

      return {
        ...state,
        isAuthenticated: false,
        user: null,
        email: null,
        token: null,
        expires_at: null,
        bypassRedirect: null,
      };

    case FRESH:
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.user.name,
          speciality: action.payload.user.speciality,
        })
      );

      const userInLocal = localStorage.getItem("user");
      return {
        ...state,
        isAuthenticated: true,
        user: userInLocal ? JSON.parse(userInLocal) : null,
      };
    case UPDATE_PROFILE:
      localStorage.setItem("userProfile",JSON.stringify({...action.payload.profile}));
      return {
        ...state,
        profile: action.payload.profile,
      };
    case UPDATE_COURSES:
      localStorage.setItem("userProfile",JSON.stringify({...action.payload.profile}));
      return {
        ...state,
        profile: {
          ...state?.profile,
          courses_progress: action.payload.courses_progress,
        },
      };
      case SET_FETCH:
        return {
          ...state,
          onRequest: action.payload.onRequest,
        };
    default:
      return state;
  }
};
