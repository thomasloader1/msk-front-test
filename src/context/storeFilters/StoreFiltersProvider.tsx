import { Profession, Specialty } from "data/types";
import React, { createContext, useReducer } from "react";

interface Filter {
  specialties: Specialty[];
  professions: Profession[];
}

interface State {
  storeFilters: Filter;
}

interface Action {
  type: "ADD_FILTER" | "REMOVE_FILTER";
  payload: {
    filterType: keyof Filter;
    filterValue: Specialty | Profession;
  };
}

type StoreFiltersContextType = {
  state: State;
  addFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession
  ) => void;
  removeFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession
  ) => void;
};

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
  },
};

export const StoreFiltersContext = createContext<StoreFiltersContextType>({
  state: initialState,
  addFilter: () => {},
  removeFilter: () => {},
});

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

export const StoreFiltersProvider: React.FC<any> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFilter = (
    filterType: keyof Filter,
    filterValue: Specialty | Profession
  ) => {
    dispatch({
      type: "ADD_FILTER",
      payload: {
        filterType,
        filterValue,
      },
    });
  };

  const removeFilter = (
    filterType: keyof Filter,
    filterValue: Specialty | Profession
  ) => {
    dispatch({
      type: "REMOVE_FILTER",
      payload: {
        filterType,
        filterValue,
      },
    });
  };

  return (
    <StoreFiltersContext.Provider value={{ state, addFilter, removeFilter }}>
      {children}
    </StoreFiltersContext.Provider>
  );
};
