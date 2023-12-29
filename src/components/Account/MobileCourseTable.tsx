import Badge from "components/Badge/Badge";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcImage from "components/NcImage/NcImage";
import StorePagination from "components/Store/StorePagination";
import React, { FC } from "react";
import { CoursesTableComponentProps } from "./DesktopCoursesTable";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import { formatDate } from "lib/formatDate";
import calendarIcon from "../../images/icons/calendar.svg";
import {
  colorStatus,
  statusCourse,
  goToEnroll,
  statusOrdenVenta,
} from "logic/account";
import ButtonAccessCourse from "./ButtonAccessCourse";
import InfoText from "components/InfoText/InfoText";

const MobileCourseTable: FC<CoursesTableComponentProps> = ({
  currentItems,
  config,
}) => {
  const { email, goToLMS, handlePageChange, totalPages, currentPage } = config;

  return (
    <div className="flex flex-col space-y-8">
      <ul>
        {currentItems.map((item) => {
          const { isDisabled } = statusCourse(item.status);
          const statusOV = statusOrdenVenta(item.ov);

          const isReadyToEnroll = item?.status?.includes("Listo para enrolar");
          return (
            <li key={item.product_code} className="my-account-courses-mobile">
              <div className="direct-info">
                <NcImage
                  containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                  src={item.featured_image}
                />

                <span className="font-normal dark:text-neutral-300">
                  {item.title || "-"}
                </span>
                <div className="status-badge">
                  <Badge
                    name={statusOV.isDisabled ? statusOV.hasText : item?.status}
                    color={colorStatus(
                      statusOV.isDisabled ? statusOV.hasText : item?.status
                    )}
                    textSize="text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center mt-2 ml-1">
                <img src={calendarIcon} alt="Calendar Icon" className="mr-2" />
                <span className="text-violet-wash text-sm">
                  Fecha de expiración: {formatDate(new Date(item.expiration))}
                </span>
              </div>
              {(isDisabled && !isReadyToEnroll) ||
                (statusOV.isDisabled && <CentroAyudaLink />)}
              {isReadyToEnroll && (
                <InfoText text="¿No ves resultados? Intenta refrescar la pantalla." />
              )}

              <div className="w-full">
                <ButtonAccessCourse
                  email={email}
                  goToEnroll={goToEnroll}
                  goToLMS={goToLMS}
                  item={item}
                />
              </div>
            </li>
          );
        })}
      </ul>
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

export default MobileCourseTable;
