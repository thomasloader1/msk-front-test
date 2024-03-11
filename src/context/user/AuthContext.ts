import { createContext, Dispatch } from "react";
import { AuthState, AuthAction } from "data/types";

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}>({
  state: {
    isAuthenticated: false,
    user: null,
    profile: null,
    token: null,
    email: null,
    entity_id_crm: null,
    expires_at: null,
    bypassRedirect: null,
    onRequest: null
  },
  dispatch: () => {},
});
