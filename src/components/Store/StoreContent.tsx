import React, { FC, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import { FetchCourseType, Profession, Specialty } from "data/types";

interface Props {
  products: FetchCourseType[];
  professions: Profession[];
  specialties: Specialty[];
}

const StoreContent: FC<Props> = ({ products, professions, specialties }) => {
  const [currentPage, setCurrentPage] = useState(1);
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
    console.log(specialty);
  };
  const onChangeProfession = (profession: Profession) => {
    console.log(profession);
  };

  return (
    <section className="container course-content-area pb-90">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[20%_80%] gap-4 mb-10">
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
