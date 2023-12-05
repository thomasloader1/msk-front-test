import { DataAction, DataState } from "./DataContext";

export const dataInitialState = {
  allCourses: [],
  allPosts: [],
  allBestSellers: [],
  allProfessions: [],
  allSpecialties: [],
  allSpecialtiesGroups: [],
};

const GET_DATA = "GET_DATA";

export const dataReducer = (
  state: DataState,
  action: DataAction
): DataState => {
  switch (action.type) {
    case "GET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
