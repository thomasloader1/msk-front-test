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
    default:
      return state;
  }
};
