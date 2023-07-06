import { CountryState, CountryAction } from "./CountryContext";

// Define el reductor del país
function countryReducer(
  state: CountryState,
  action: CountryAction
): CountryState {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    default:
      return state;
  }
}

export default countryReducer;
