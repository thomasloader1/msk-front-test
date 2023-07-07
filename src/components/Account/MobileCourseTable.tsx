import Badge from 'components/Badge/Badge';
import ButtonPrimary from 'components/Button/ButtonPrimary';
import NcImage from 'components/NcImage/NcImage';
import StorePagination from 'components/Store/StorePagination';
import React, { FC } from 'react'
import { CoursesTableComponentProps } from './DesktopCoursesTable';

const MobileCourseTable: FC<CoursesTableComponentProps> = ({ currentItems, config }) => {
    const { email, goToLMS, handlePageChange, totalPages, currentPage } = config

    return (
        <div className="flex flex-col space-y-8">
            <ul>
                {currentItems.map((item) => (
                    <li key={item.product_code} className="my-account-courses-mobile">
                        <div className="direct-info">

                            <NcImage
                                containerClassName="flex-shrink-0 h-12 w-12 rounded-lg overflow-hidden lg:h-14 lg:w-14"
                                src={item.featured_image}
                            />

                            <h2 className="text-sm font-semibold  dark:text-neutral-300">
                                {item.title || "-"}
                            </h2>
                            <div className="status-badge">

                                <Badge
                                    name={item.status}
                                    color={item.status == "Activo" ? "teal-active" : "red"}
                                    textSize="text-sm"
                                />

                            </div>
                        </div>
                        {item.status !== "Activo" && <span className="dark:text-primary-500 forgot-password col-span-2 text-sm">
                            Si tienes dudas visita nuestro{" "}
                            <a
                                className="nc-NcLink underline text-primary-6000 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-6000"
                                href="https://ayuda.msklatam.com/portal/es/kb/articles/categoria-demo"
                                target='_blank'
                            >
                                Centro de Ayuda
                            </a>
                        </span>}



                        <div className="w-full">
                            <ButtonPrimary
                                disabled={item.status !== 'Activo'}
                                onClick={() => {
                                    goToLMS(item.product_code_cedente, email);
                                }}
                                sizeClass="py-1 px-3 sm:px-5"
                            >
                                <span className="text-sm">
                                    {item.status != "Activo" ? "Activar" : "Ir al curso"}
                                </span>
                            </ButtonPrimary>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <StorePagination
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default MobileCourseTable