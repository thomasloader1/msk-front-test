import { deleteCookie, getCookie } from "utils/cookies";
import { UTMContextType } from "./UTMContext";

export interface UTMAction {
  type: string;
  payload: Partial<UTMContextType>;
}

export const utmReducer = (
  state: UTMContextType,
  action: UTMAction
): UTMContextType => {
  switch (action.type) {
    case "UPDATE_UTM":
      return {
        ...state,
        ...action.payload,
      };
    case "CLEAR_UTM":
      deleteCookie("utm_source");
      deleteCookie("utm_medium");
      deleteCookie("utm_campaign");
      deleteCookie("utm_content");
      return {
        ...state,
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
      };
    default:
      return state;
  }
};
