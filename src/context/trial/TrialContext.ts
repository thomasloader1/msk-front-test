import { createContext, Dispatch } from "react";

export interface TrialAction {
  type: "GET_DATA" | "SET_PRODUCT" | "SET_MODAL" | "SET_PAYMENT";
  payload: {
    [key: string]: any;
  };
}

export interface TrialState {
  product: any;
  showModal: any;
  paymentCorrect: any;
}

export const TrialContext = createContext<{
  loadingProduct?: boolean;
  state: TrialState;
  dispatch: Dispatch<TrialAction>;
}>({
  state: {
    product: {},
    showModal: false,
    paymentCorrect: null
  },
  dispatch: () => {},
});
