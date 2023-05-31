import { createContext, useReducer, useContext, FC, ReactNode } from "react";
import reducer, { Filter, State } from "./storeFiltersReducer";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";

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

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
  },
};

const StoreFiltersContext = createContext<ContextType | undefined>(undefined);

export const useStoreFilters = (): ContextType => {
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
      {children}
    </StoreFiltersContext.Provider>
  );
};
