import { TrialAction, TrialState } from "./TrialContext";

export const trialInitialState = {
  product: {},
  showModal: false,
  paymentCorrect: null
};

export const trialReducer = (
  state: TrialState,
  action: TrialAction
): TrialState => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "SET_PRODUCT":
        return {
        ...state,
        product: action.payload.product,
        };
    case "SET_MODAL":
        return {
        ...state,
        showModal: action.payload.showModal,
        };
    case "SET_PAYMENT":
        return {
        ...state,
        paymentCorrect: action.payload.paymentCorrect,
        };
    default:
      return state;
  }
};
