import axios from "axios";
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

function StoreFiltersProvider(props: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addFilter(
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter
  ) {
    dispatch({ type: "ADD_FILTER", payload: { filterType, filterValue } });
  }

  function removeFilter(
    filterType: keyof Filter,
    filterValue: Specialty | Profession | DurationFilter
  ) {
    dispatch({ type: "REMOVE_FILTER", payload: { filterType, filterValue } });
  }

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
