import axios from "axios";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import React, { createContext, useReducer, useContext } from "react";
import reducer, { Action, Filter, State } from "./storeFiltersReducer";

type ContextType = {
  storeFilters: Filter;
  addFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter | ResourceFilter
  ) => void;
  removeFilter: (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter | ResourceFilter
  ) => void;
  clearFilters: () => void;
};

const StoreFiltersContext = createContext<ContextType>({
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
  },
  addFilter: () => {},
  removeFilter: () => {},
  clearFilters: () => {},
});

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
  },
};

function StoreFiltersProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFilter = (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter | ResourceFilter
  ) => {
    dispatch({ type: "ADD_FILTER", payload: { filterType, filterValue } });
  };

  const removeFilter = (
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter | ResourceFilter
  ) => {
    dispatch({ type: "REMOVE_FILTER", payload: { filterType, filterValue } });
  };

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <StoreFiltersContext.Provider
      value={{
        storeFilters: state.storeFilters,
        addFilter,
        removeFilter,
        clearFilters,
      }}
    >
      {props.children}
    </StoreFiltersContext.Provider>
  );
}

function useStoreFilters() {
  return useContext(StoreFiltersContext);
}

export { StoreFiltersProvider, useStoreFilters };
