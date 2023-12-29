import Badge from "components/Badge/Badge";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcImage from "components/NcImage/NcImage";
import StorePagination from "components/Store/StorePagination";
import { UserCourseProgress } from "data/types";
import React, { FC, useContext } from "react";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import { formatDate } from "lib/formatDate";
import calendarIcon from "../../images/icons/calendar.svg";
import {
  colorStatus,
  goToEnroll,
  statusCourse,
  statusOrdenVenta,
} from "logic/account";
import ButtonAccessCourse from "./ButtonAccessCourse";
import InfoText from "components/InfoText/InfoText";
export interface CoursesTableComponentProps {
  currentItems: UserCourseProgress[];
  config: {
    handlePageChange: (pageNumber: number) => void;
    goToLMS: (
      product_code: number,
      cod_curso: string,
      email: string
    ) => Promise<void>;
    email: string;
    itemsPerPage: number;
    totalPages: number;
    indexOfFirstItem: number;
    indexOfLastItem: number;
    currentPage: number;
  };
}

const DesktopCoursesTable: FC<CoursesTableComponentProps> = ({
  currentItems,
  config,
}) => {
  const { email, goToLMS, handlePageChange, totalPages, currentPage } = config;
  return (
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
                    Avance
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {currentItems.map((item) => {
                  const { isDisabled } = statusCourse(item.status);
                  const statusOV = statusOrdenVenta(item.ov);
                  return (
                    <tr key={item.product_code}>
                      <td className="px-6 py-4">
                        <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                          <NcImage
                            containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                            src={item.featured_image}
                          />
                          <div className="flex-wrap">
                            <div className="ml-4 flex-grow">
                              <span className="inline-flex line-clamp-2 font-normal  dark:text-neutral-300">
                                {item.title || "-"}
                              </span>
                            </div>

                            <div className="flex items-center mt-2 ml-4">
                              <img
                                src={calendarIcon}
                                alt="Calendar Icon"
                                className="mr-2"
                              />
                              <span className="text-violet-wash text-sm">
                                Fecha de expiración:{" "}
                                {formatDate(new Date(item.expiration))}
                              </span>
                            </div>
                            {(isDisabled &&
                              !item?.status?.includes("Listo para enrolar")) ||
                              (statusOV.isDisabled && (
                                <CentroAyudaLink addClassNames="mt-2 ml-3" />
                              ))}

                            {item?.status?.includes("Listo para enrolar") && (
                              <InfoText
                                addClassNames="mt-2 ml-3"
                                text="¿No ves resultados? Intenta refrescar la pantalla."
                              />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 status-badge">
                        <Badge
                          name={
                            statusOV.isDisabled ? statusOV.hasText : item.status
                          }
                          color={colorStatus(
                            statusOV.isDisabled ? statusOV.hasText : item.status
                          )}
                          textSize="text-sm"
                        />
                      </td>
                      <td className="px-6 py-4  text-xs text-neutral-500 dark:text-neutral-400">
                        <span className="text-sm">
                          {" "}
                          {item.avance ? item.avance : 0} %
                        </span>
                      </td>
                      <td className="px-4">
                        <ButtonAccessCourse
                          email={email}
                          goToEnroll={goToEnroll}
                          goToLMS={goToLMS}
                          item={item}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <StorePagination
          totalPages={totalPages}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default DesktopCoursesTable;
