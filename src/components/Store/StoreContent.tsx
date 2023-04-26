import React, { FC, useEffect, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import { FetchCourseType, Profession, Specialty } from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreContext";

interface Props {
  products: FetchCourseType[];
  professions: Profession[];
  specialties: Specialty[];
}

const StoreContent: FC<Props> = ({ products, professions, specialties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { storeFilters, addFilter, removeFilter } = useStoreFilters();

  const itemsPerPage = 9;

  // Calcular el índice del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos de la página actual
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Función para cambiar la página
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onChangeSpecialty = (specialty: Specialty) => {
    const specialtyExists = storeFilters.specialties.filter(
      (item: Specialty) => {
        return item.name == specialty.name;
      }
    );
    if (specialtyExists.length) removeFilter("specialties", specialty);
    else addFilter("specialties", specialty);
  };

  const onChangeProfession = (profession: Profession) => {
    const professionExists = storeFilters.professions.filter(
      (item: Profession) => {
        return item.name == profession.name;
      }
    );
    if (professionExists.length) removeFilter("professions", profession);
    else addFilter("professions", profession);
  };

  return (
    <section className="container course-content-area pb-90">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%] gap-4 mb-10">
        <div className="flex flex-col">
          <StoreSideBar
            specialties={specialties}
            professions={professions}
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((product, index) => {
              return (
                <StoreProduct
                  product={product}
                  key={`${product.id}_${index}`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1">
            <StorePagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
