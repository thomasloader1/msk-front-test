import { CountryState, AuthAction } from "data/types";

const SET_COUNTRY = "SET_COUNTRY";
export const countryReducer = (
  state: CountryState,
  action: AuthAction
): CountryState => {
  switch (action.type) {
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload.country,
      };
    default:
      return state;
  }
};
