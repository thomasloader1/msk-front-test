import { createContext } from "react";
import { Filter } from "./storeFiltersReducer";

export const StoreFiltersContext = createContext<Filter | undefined>(undefined);
