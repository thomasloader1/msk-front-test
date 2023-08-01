import { createContext, Dispatch } from "react";
import { AuthState, AuthAction } from "data/types";

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {
    isAuthenticated: false,
    user: null,
    token: null,
    email: null,
    expires_at: null,
    bypassRedirect: null,
  },
  dispatch: () => {},
});
