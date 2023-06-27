import React, { FC, useContext } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import Badge from "components/Badge/Badge";
import { UserCourseProgress } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "Services/api";
import { AuthContext } from "context/user/AuthContext";

interface AccountCoursesProps {
  courses: UserCourseProgress[];
  email: string
}

const DashboardPosts: FC<AccountCoursesProps> = ({ courses, email }) => {
  const [isMobile, setIsMobile] = useState(false);
  const history = useHistory();
  //console.log({ courses, email })
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
    const { sso } = await api.getLinkLMS(cod_curso, email)
    console.log({ sso })
    window.open(sso, '_blank');
  }

  return isMobile ? (
    <>
      {courses && courses.length ? (
        <ul>
          {courses.map((item) => (
            <li key={item.product_code} className="my-account-courses-mobile">
              <div className="direct-info">
                {
                  <NcImage
                    containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                    src={item.featured_image}
                  />
                }
                <h2 className="text-sm font-semibold  dark:text-neutral-300">
                  {item.title || "-"}
                </h2>
              </div>
              {
                <Badge
                  name={item.status_payment}
                  color={
                    item.status_payment == "Activo" ? "teal-active" : "red"
                  }
                  textSize="text-sm"
                />
              }
              <span className="text-sm"> {item.status}</span>
              <div className="w-full">
                <ButtonPrimary
                  onClick={() => goToLMS(item.product_code_cedente, email)}
                  sizeClass="py-1 px-3 sm:px-5">
                  <span className="text-sm">
                    {item.status != "Activo"
                      ? "Activar"
                      : "Ir al curso"}
                  </span>
                </ButtonPrimary>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center gap-6 my-24 lg:mt-10">
          <p className="raleway text-3xl text-center">
            Aún puedes descubrir mucho más en Medical & Scientific Knowledge
          </p>
          <ButtonPrimary
            onClick={goToStore}
            sizeClass="py-3 "
            className="font-semibold px-6"
          >
            Comienza un curso
          </ButtonPrimary>
        </div>
      )}
    </>
  ) : (
    <>
      {courses && courses.length ? (
        <div className="flex flex-col space-y-8">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full px-1 sm:px-6 lg:px-8">
              <div className="shadow dark:border dark:border-neutral-800 overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800">
                  <thead className="bg-neutral-50 dark:bg-neutral-800">
                    <tr className="text-left text-xs text-neutral-500 dark:text-neutral-300 uppercase tracking-wider">
                      <th scope="col" className="px-6 py-3 font-medium">
                        Curso
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Estado
                      </th>
                      <th scope="col" className="px-6 py-3 font-medium">
                        Pago
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                    {courses.map((item) => (
                      <tr key={item.product_code}>
                        <td className="px-6 py-4">
                          <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                            {
                              <NcImage
                                containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                                src={item.featured_image}
                              />
                            }
                            <div className="ml-4 flex-grow">
                              <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                                {item.title || "-"}
                              </h2>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 status-badge">
                          {
                            <Badge
                              name={item.status_payment}
                              color={
                                item.status_payment == "Activo"
                                  ? "teal-active"
                                  : "red"
                              }
                              textSize="text-sm"
                            />
                          }
                        </td>
                        <td className="px-6 py-4  text-xs text-neutral-500 dark:text-neutral-400">
                          <span className="text-sm"> {item.status}</span>
                        </td>
                        <td className="px-4">
                          <ButtonPrimary sizeClass="py-1 sm:px-5">
                            <span className="text-sm">
                              {item.status_payment != "Activo"
                                ? "Activar"
                                : "Ir al curso"}
                            </span>
                          </ButtonPrimary>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/*<Pagination />*/}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-6 my-24 lg:mt-10">
          <p className="raleway text-3xl text-center">
            Aún puedes descubrir mucho más en Medical & Scientific Knowledge
          </p>
          <ButtonPrimary
            onClick={goToStore}
            sizeClass="py-3 "
            className="font-semibold px-6"
          >
            Comienza un curso
          </ButtonPrimary>
        </div>
      )}
    </>
  );
};

export default DashboardPosts;
