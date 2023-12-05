import { createContext, Dispatch } from "react";

export interface DataState {
  allCourses: any;
  allPosts: any;
  allBestSellers: any;
  allProfessions: any;
  allSpecialties: any;
  allSpecialtiesGroups: any;
}

export interface DataAction {
  type: "GET_DATA";
  payload: {
    [key: string]: any;
  };
}

export const DataContext = createContext<{
  loadingCourses?: boolean;
  loadingPosts?: boolean;
  loadingBestSellers?: boolean;
  loadingProfessions?: boolean;
  loadingSpecialties?: boolean;
  state: DataState;
  dispatch: Dispatch<DataAction>;
}>({
  state: {
    allCourses: [],
    allPosts: [],
    allBestSellers: [],
    allProfessions: [],
    allSpecialties: [],
    allSpecialtiesGroups: [],
  },
  dispatch: () => {},
});
