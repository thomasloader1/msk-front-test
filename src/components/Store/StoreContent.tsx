import React, { FC, useEffect, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import {
  DurationFilter,
  FetchCourseType,
  JsonMapping,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";
import { useHistory } from "react-router-dom";
import specialtiesMapping from "../../data/jsons/__specialties.json";
import resourcesMapping from "../../data/jsons/__resources.json";
import StoreBar from "./StoreBar";

interface Props {
  products: FetchCourseType[];
  professions: Profession[];
  specialties: Specialty[];
  productsLength: number;
  handleTriggerSearch: (e: any) => void;
  handleTriggerFilter: (e: any) => void;
}

const StoreContent: FC<Props> = ({
  products,
  professions,
  specialties,
  productsLength,
  handleTriggerSearch,
  handleTriggerFilter,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { storeFilters, addFilter, removeFilter, clearFilters } =
    useStoreFilters();
  const history = useHistory();
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

    if (specialtyExists.length) {
      removeFilter("specialties", specialty);
    } else {
      addFilter("specialties", specialty);
    }
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
    //console.log(currentUrl, { searchQuery });
    if (searchQuery[1]) {
      const queryParams = searchQuery[1].split("&");
      clearFilters();

      queryParams.forEach((query, index) => {
        const filterQueries = query
          .split("=")[1]
          .split(",")
          .map((item) => decodeURIComponent(item));
        const filterType = query.split("=")[0];
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
          case "especialidad":
            const specialtiesJSON: JsonMapping = specialtiesMapping;
            const [specialtieQueryName] = filterQueries;
            const specialtyName = specialtiesJSON[specialtieQueryName];
            addFilter("specialties", {
              id: 1,
              name: specialtyName,
            });
            /*  if (filterQueries.includes("Emergentología")) {
              addFilter("specialties", {
                id: 1,
                name: "Emergentología",
              });
            }
            if (filterQueries.includes("Medicina general")) {
              addFilter("specialties", {
                id: 1,
                name: "Medicina general",
              });
            }
            if (filterQueries.includes("Infectología")) {
              addFilter("specialties", {
                id: 1,
                name: "Infectología",
              });
            } */
            break;
          case "recurso":
            const resourceJSON: JsonMapping = resourcesMapping;
            const [resourceQueryName] = filterQueries;
            const resourceName = resourceJSON[resourceQueryName];
            addFilter("resources", {
              name: resourceName,
              id: 1,
            });
          /* if (filterQueries.includes("1")) {
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
            } */
        }
      });

      setCurrentPage(1);
    }
  }, [location.search, productsLength]);

  useEffect(() => {
    setCurrentPage(1);
  }, [storeFilters]);

  return (
    <section className="container course-content-area pb-90 animate-fade-down">
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-4 mb-10">
        <div className="hidden lg:flex flex-col">
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
          <StoreBar
            onSearch={(e) => handleTriggerSearch(e)}
            onFilter={(e) => handleTriggerFilter(e)}
            length={products.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {currentItems.length ? (
              currentItems.map((product, index) => {
                return (
                  <StoreProduct
                    product={product}
                    key={`${product.slug}_${index}`}
                    kind={product.father_post_type}
                  />
                );
              })
            ) : (
              <div className="text-center col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center h-[350px]">
                <img src="/src/images/icons/no_items.svg" className="mb-5" />
                <p>
                  No hay resultados para tu búsqueda.
                  <br />
                  Modifica los filtros y encuentra tu curso ideal.
                </p>
              </div>
            )}
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
