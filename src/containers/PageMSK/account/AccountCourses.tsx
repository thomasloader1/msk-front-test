import React, { FC, useState, useEffect } from "react";
import { UserCourseProgress } from "data/types";
import { useHistory } from "react-router-dom";
import { goToLMS, goToEnroll } from "logic/account";
import CoursesTable from "components/Account/CoursesTable";

interface AccountCoursesProps {
  courses: UserCourseProgress[];
  email: string;
}

const AccountCourses: FC<AccountCoursesProps> = ({ courses, email }) => {
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();
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
    goToEnroll,
    goToStore,
    email,
  }

  return (<CoursesTable courses={courses} tableConfig={tableConfig} isMobile={isMobile} />)

};

export default AccountCourses;
