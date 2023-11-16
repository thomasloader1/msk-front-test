import { createContext } from "react";
import { Filter } from "./storeFiltersReducer";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";

export type ContextType = {
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

export const StoreFiltersContext = createContext<ContextType | undefined>(
  undefined
);
