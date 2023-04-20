import React from "react";
import NcImage from "components/NcImage/NcImage";
import Pagination from "components/Pagination/Pagination";
import { USER_COURSES } from "data/MSK/courses";

const courses = USER_COURSES;

const DashboardPosts = () => {
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
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-900 divide-y divide-neutral-200 dark:divide-neutral-800">
                {courses.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center w-96 lg:w-auto max-w-md overflow-hidden">
                        <NcImage
                          containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                          src={item.featuredImage}
                        />
                        <div className="ml-4 flex-grow">
                          <h2 className="inline-flex line-clamp-2 text-sm font-semibold  dark:text-neutral-300">
                            {item.title}
                          </h2>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {item.status ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-normal rounded bg-emerald-100 text-cyan-900 lg:text-sm">
                          Activo
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-sm text-red-500 dark:text-neutral-400 bg-red-100 rounded">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500 dark:text-neutral-400">
                      <span> {item.payment}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Pagination />
    </div>
  );
};

export default DashboardPosts;
