"use client";
import { useReducer, useContext, FC, ReactNode } from "react";
import reducer, { Filter, State } from "./storeFiltersReducer";
import {
  DurationFilter,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { StoreFiltersContext } from "./StoreContext";

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
    page: [],
  },
};

export const useStoreFilters = () => {
  const context = useContext(StoreFiltersContext);
  if (!context) {
    throw new Error(
      "useStoreFilters must be used within a StoreFiltersProvider"
    );
  }
  return context;
};

interface Props {
  children: ReactNode;
}

export const StoreFiltersProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addFilter = (
    filterType: keyof Filter,
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
  ) => {
    if (typeof filterValue.id != "undefined")
      dispatch({ type: "ADD_FILTER", payload: { filterType, filterValue } });
  };

  const updateFilter = (filterType: keyof Filter, filterValue: PageFilter) => {
    dispatch({ type: "UPDATE_FILTER", payload: { filterType, filterValue } });
  };

  const removeFilter = (
    filterType: keyof Filter,
    filterValue:
      | Specialty
      | Profession
      | DurationFilter
      | ResourceFilter
      | PageFilter
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
        updateFilter,
        removeFilter,
        clearFilters,
      }}
    >
      {children}
    </StoreFiltersContext.Provider>
  );
};
