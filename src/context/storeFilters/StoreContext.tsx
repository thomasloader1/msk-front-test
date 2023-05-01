import axios from "axios";
import {
  DurationFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import React, { createContext, useReducer, useContext } from "react";

type Filter = {
  specialties: Specialty[];
  professions: Profession[];
  duration: DurationFilter[];
  resources: ResourceFilter[];
};

type State = {
  storeFilters: Filter;
};

type Action =
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
    };

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
};

const fetchSpecialties = async () => {
  try {
    const response = await axios.get(
      "https://msklatam.com/msk-laravel/public/api/specialities"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchProfessions = async () => {
  try {
    const response = await axios.get(
      "https://msklatam.com/msk-laravel/public/api/professions"
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
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
});

const initialState: State = {
  storeFilters: {
    specialties: [],
    professions: [],
    duration: [],
    resources: [],
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
            (
              filterValue:
                | Specialty
                | Profession
                | DurationFilter
                | ResourceFilter
            ) => {
              return (
                filterValue !== action.payload.filterValue &&
                filterValue.name !== action.payload.filterValue.name
              );
            }
          ),
        },
      };
    default:
      return state;
  }
}

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

  return (
    <StoreFiltersContext.Provider
      value={{ storeFilters: state.storeFilters, addFilter, removeFilter }}
    >
      {props.children}
    </StoreFiltersContext.Provider>
  );
}

function useStoreFilters() {
  return useContext(StoreFiltersContext);
}

export { StoreFiltersProvider, useStoreFilters };
