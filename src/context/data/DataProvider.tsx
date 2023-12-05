import React, { useEffect, useReducer, useState } from "react";
import { DataContext } from "./DataContext";
import { dataReducer } from "./DataReducer";
import api from "Services/api";

interface Props {
  children: React.ReactNode;
}

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingBestSellers, setLoadingBestSellers] = useState(true);
  const [loadingProfessions, setLoadingProfessions] = useState(true);
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);

  const dataInitialState = {
    allCourses: [],
    allPosts: [],
    allBestSellers: [],
    allProfessions: [],
    allSpecialties: [],
    allSpecialtiesGroups: [],
  };

  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  const fetchCourses = async () => {
    const allCourses = await api.getAllCourses();
    dispatch({
      type: "GET_DATA",
      payload: { allCourses },
    });
    setLoadingCourses(false);
  };

  const fetchPosts = async () => {
    try {
      const allPosts = await api.getPosts();
      dispatch({
        type: "GET_DATA",
        payload: { allPosts },
      });
      setLoadingPosts(false);
    } catch (error) {
      console.error({ error });
    }
  };

  const fetchBestSeller = async () => {
    try {
      const allBestSellers = await api.getBestSellers();
      dispatch({
        type: "GET_DATA",
        payload: { allBestSellers },
      });
      setLoadingBestSellers(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchProfessions = async () => {
    try {
      const allProfessions = await api.getProfessions();
      dispatch({
        type: "GET_DATA",
        payload: { allProfessions },
      });
      setLoadingProfessions(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchSpecialties = async () => {
    try {
      const allSpecialties = await api.getSpecialtiesAndGroups();
      dispatch({
        type: "GET_DATA",
        payload: { allSpecialtiesGroups: allSpecialties.specialities_group },
      });
      dispatch({
        type: "GET_DATA",
        payload: { allSpecialties: allSpecialties.specialities },
      });
      setLoadingSpecialties(false);
    } catch (e) {
      console.error({ e });
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchPosts();
    fetchBestSeller();
    fetchProfessions();
    fetchSpecialties();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loadingBestSellers,
        loadingCourses,
        loadingPosts,
        loadingProfessions,
        loadingSpecialties,
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
