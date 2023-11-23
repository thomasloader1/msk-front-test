import Badge from "components/Badge/Badge";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcImage from "components/NcImage/NcImage";
import StorePagination from "components/Store/StorePagination";
import React, { FC } from "react";
import { CoursesTableComponentProps } from "./DesktopCoursesTable";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import { formatDate } from "lib/formatDate";
import calendarIcon from "../../images/icons/calendar.svg";
import { colorStatus, statusCourse, goToEnroll } from "logic/account";

const MobileCourseTable: FC<CoursesTableComponentProps> = ({currentItems,config}) => {

  const { email, goToLMS, handlePageChange, totalPages, currentPage } = config;
  
  return (
    <div className="flex flex-col space-y-8">
      <ul>
        {currentItems.map((item) => {
          const { isDisabled, hasText } = statusCourse(item.status)
          
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
                  name={item.status}
                  color={colorStatus(item.status)}
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
            {isDisabled && <CentroAyudaLink />}

            <div className="w-full">
              <ButtonPrimary
                disabled={isDisabled}
                onClick={() => {
                  if(item.status.includes("Sin enrolar")){
                    goToEnroll(
                      item.product_code,
                      item.product_code_cedente,
                      email
                    );
                  }else{
                    goToLMS(
                      item.product_code,
                      item.product_code_cedente,
                      email
                    );
                  }
                }}
                sizeClass="py-1 px-3 sm:px-5"
              >
                <span className="text-sm">
                  {hasText}
                </span>
              </ButtonPrimary>
            </div>
          </li>
        )}
        )}
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
