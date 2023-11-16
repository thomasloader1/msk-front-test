import { CountryState, AuthAction } from "data/types";
import { countries } from "data/countries";

const SET_COUNTRY = "SET_COUNTRY";
export const countryReducer = (
  state: CountryState,
  action: AuthAction
): CountryState => {
  switch (action.type) {
    case SET_COUNTRY:
      let validCountries = countries.map((item) => item.id);
      if (!validCountries.includes(action.payload.country)) {
        return {
          ...state,
        };
      } else {
        return {
          ...state,
          country: action.payload.country,
        };
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
