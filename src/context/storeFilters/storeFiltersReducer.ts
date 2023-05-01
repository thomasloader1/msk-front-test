import React, { createContext, useReducer, useContext } from "react";
import {
  ResourceFilter,
  DurationFilter,
  Profession,
  Specialty,
} from "data/types";

export type Filter = {
  specialties: Specialty[];
  professions: Profession[];
  duration: DurationFilter[];
  resources: ResourceFilter[];
};

export type State = {
  storeFilters: Filter;
};

export type Action =
  | {
      type: "ADD_FILTER";
      payload: {
        filterType: keyof Filter;
        filterValue: Specialty | Profession | DurationFilter | ResourceFilter;
      };
    }
  | {
      type: "REMOVE_FILTER";
      payload: {
        filterType: keyof Filter;
        filterValue: Specialty | Profession | DurationFilter | ResourceFilter;
      };
    }
  | {
      type: "CLEAR_FILTERS";
    };

const reducer = (state: State, action: Action): State => {
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
          ].filter((filterValue: any) => {
            return (
              filterValue !== action.payload.filterValue &&
              filterValue.name !== action.payload.filterValue.name
            );
          }),
        },
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        storeFilters: {
          specialties: [],
          professions: [],
          duration: [],
          resources: [],
        },
      };
    default:
      return state;
  }
};

export default reducer;
