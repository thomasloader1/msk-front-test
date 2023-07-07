import React, { FC, useContext } from "react";
import NcImage from "components/NcImage/NcImage";
import StorePagination from "components/Store/StorePagination";
import Badge from "components/Badge/Badge";
import { UserCourseProgress } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "Services/api";
import { AuthContext } from "context/user/AuthContext";
import CoursesTable from "components/Account/CoursesTable";

interface AccountCoursesProps {
  courses: UserCourseProgress[];
  email: string;
}

const AccountCourses: FC<AccountCoursesProps> = ({ courses, email }) => {
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();
  console.log({ courses, email });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const goToStore = () => {
    history.push("/tienda");
  };

  const goToLMS = async (cod_curso: string, email: string) => {
    const { sso } = await api.getLinkLMS(cod_curso, email);
    console.log({ sso });
    window.open(sso, "_blank");
  };

  const itemsPerPage = 5;
  const totalPages = Math.ceil(courses.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courses.slice(indexOfFirstItem, indexOfLastItem);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const tableConfig = {
    goToLMS,
    goToStore,
    email,
  }

  return (<CoursesTable courses={courses} tableConfig={tableConfig} isMobile={isMobile} />)

};

export default AccountCourses;
