import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import Badge from "components/Badge/Badge";
import { UserCourse } from "data/types";
import ButtonPrimary from "components/Button/ButtonPrimary";

interface AccountCoursesProps {
  courses: UserCourse[];
}

const DashboardPosts: FC<AccountCoursesProps> = ({ courses }) => {
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
  );
};

export default DashboardPosts;
