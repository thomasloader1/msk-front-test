import React, { FC, useEffect, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import {
  DurationFilter,
  FetchCourseType,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";

interface Props {
  products: FetchCourseType[];
  professions: Profession[];
  specialties: Specialty[];
}

const StoreContent: FC<Props> = ({ products, professions, specialties }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { storeFilters, addFilter, removeFilter, clearFilters } =
    useStoreFilters();

  const itemsPerPage = 18;

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
        return item.slug == profession.slug;
      }
    );
    if (professionExists.length) removeFilter("professions", profession);
    else addFilter("professions", profession);
  };

  const onChangeResource = (resource: ResourceFilter) => {
    const resourceExists = storeFilters.resources.filter(
      (item: ResourceFilter) => {
        return item.id == resource.id;
      }
    );
    if (resourceExists.length) {
      removeFilter("resources", resource);
    } else addFilter("resources", resource);
  };

  const onChangeDuration = (duration: DurationFilter) => {
    const durationExists = storeFilters.duration.filter(
      (item: DurationFilter) => {
        return item.value == duration.value;
      }
    );
    if (durationExists.length) {
      removeFilter("duration", duration);
    } else addFilter("duration", duration);
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const searchQuery = currentUrl.split("?");
    if (searchQuery[1]) {
      const filterQueries = searchQuery[1].split("=")[1].split(",");
      const filterType = searchQuery[1].split("=")[0];
      clearFilters();
      switch (filterType) {
        case "profesion":
          if (filterQueries.includes("medicos"))
            addFilter("professions", {
              id: 1,
              name: "Personal médico",
              slug: "medicos",
            });
          if (
            filterQueries.includes("enfermeros-auxiliares") &&
            filterQueries.includes("otra-profesion")
          ) {
            addFilter("professions", {
              id: 2,
              name: "Personal de enfermería y auxiliares",
              slug: "enfermeros-auxiliares",
            });
            addFilter("professions", {
              id: 3,
              name: "Otra profesión",
              slug: "otra-profesion",
            });
          }
          break;
        case "recurso":
          if (filterQueries.includes("1")) {
            addFilter("resources", {
              name: "Curso",
              id: 1,
            });
          }
          if (filterQueries.includes("2")) {
            addFilter("resources", {
              name: "Guías profesionales",
              id: 2,
            });
          }
      }
    }
  }, [location.search]);

  return (
    <section className="container course-content-area pb-90">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[30%_70%] gap-4 mb-10">
        <div className="flex flex-col">
          <StoreSideBar
            specialties={specialties}
            professions={professions}
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
          />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentItems.map((product, index) => {
              return (
                <StoreProduct
                  product={product}
                  key={`${product.slug}_${index}`}
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
