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
  const [loadingProductsMX, setLoadingProductsMX] = useState(true);

  const dataInitialState = {
    allCourses: [],
    allPosts: [],
    allTestCourses: [],
    allBestSellers: [],
    allProfessions: [],
    allSpecialties: [],
    allSpecialtiesGroups: [],
    allProductsMX: [],
    allStoreProfessions: [],
    allStoreSpecialties: [],
  };

  const [state, dispatch] = useReducer(dataReducer, dataInitialState);

  //Habilita los cursos por el buscador
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

  const fetchProductsMX = async () => {
    try {
      const allProductsMX = await api.getAllProductsMX();
      const allTestCourses = await api.getAllTestCourses();

      allProductsMX.push(...allTestCourses);

      dispatch({
        type: "GET_DATA",
        payload: { allProductsMX },
      });
      setLoadingProductsMX(false);
    } catch (e) {
      console.error({ e });
    }
  };

  const fetchStoreProfessionsFilter = async () => {
    const allStoreProfessions = await api.getStoreProfessions();
    dispatch({
      type: "GET_DATA",
      payload: { allStoreProfessions },
    });
  };
  const fetchStoreSpecialtiesFilter = async () => {
    const allStoreSpecialties = await api.getSpecialtiesStore();
    dispatch({
      type: "GET_DATA",
      payload: { allStoreSpecialties },
    });
  };

  useEffect(() => {
    fetchProductsMX();
    fetchCourses();
    fetchPosts();
    fetchBestSeller();
    fetchProfessions();
    fetchSpecialties();
    fetchStoreProfessionsFilter();
    fetchStoreSpecialtiesFilter();
  }, []);

  return (
    <DataContext.Provider
      value={{
        loadingBestSellers,
        loadingCourses,
        loadingPosts,
        loadingProfessions,
        loadingSpecialties,
        loadingProductsMX,
        state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
