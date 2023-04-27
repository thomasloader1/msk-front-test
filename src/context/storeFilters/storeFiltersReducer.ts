import { DurationFilter, Profession, Specialty } from "data/types";
import React, { createContext, useReducer, useContext } from "react";

type Filter = {
  specialties: Specialty[];
  professions: Profession[];
  duration: DurationFilter[];
};

type State = {
  storeFilters: Filter;
};

type Action =
  | {
      type: "ADD_FILTER";
      payload: {
        filterType: keyof Filter;
        filterValue: Specialty | Profession | DurationFilter;
      };
    }
  | {
      type: "REMOVE_FILTER";
      payload: {
        filterType: keyof Filter;
        filterValue: Specialty | Profession | DurationFilter;
      };
    };

type ContextType = {
  storeFilters: Filter;
  addFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter
  ) => void;
  removeFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter
  ) => void;
};

const StoreFiltersContext = createContext<ContextType>({
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
  },
  addFilter: () => {},
  removeFilter: () => {},
});

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_FILTER":
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          [action.payload.filterType]: [
            ...state.storeFilters[action.payload.filterType],
            action.payload.filterValue,
          ],
        },
      };
    case "REMOVE_FILTER":
      return {
        ...state,
        storeFilters: {
          ...state.storeFilters,
          [action.payload.filterType]: state.storeFilters[
            action.payload.filterType
          ].filter(
            (filterValue: any) => filterValue !== action.payload.filterValue
          ),
        },
      };
    default:
      return state;
  }
}

export default reducer;
