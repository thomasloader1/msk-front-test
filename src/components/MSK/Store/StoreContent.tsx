"use client";
import React, { FC, useContext, useEffect, useState } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import {
  DurationFilter,
  FetchCourseType,
  JsonMapping,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { useStoreFilters } from "@/context/storeFilters/StoreFiltersProvider";
import specialtiesMapping from "@/data/jsons/__specialties.json";
import resourcesMapping from "@/data/jsons/__resources.json";
import StoreBar from "./StoreBar";
import {
  getParamsFromURL,
  keepOnlySpecifiedParams,
} from "@/lib/removeUrlParams";
import { useParams, usePathname, useRouter } from "next/navigation";
import { DataContext } from "@/context/data/DataContext";
import { removeAccents } from "@/lib/removeAccents";
import api from "../../../../Services/api";

interface Props {
  products: FetchCourseType[];
  productsLength: number;
  // handleTriggerSearch: (e: any) => void;
  // handleTriggerFilter: (e: any) => void;
}

const StoreContent: FC<Props> = ({
  products,
  productsLength,
  // handleTriggerSearch,
  // handleTriggerFilter,
}) => {
  const [storeURLParams, setStoreURLParams] = useState({});
  const [localProducts, setLocalProducts] = useState<FetchCourseType[]>([]);
  const [allProducts, setAllProducts] = useState<FetchCourseType[]>([]);
  const [professions, setProfessions] = useState([]);
  const fetchProfessions = async () => {
    const professionList = await api.getStoreProfessions();
    setProfessions(professionList);
  };
  useEffect(() => {
    if (!professions.length) fetchProfessions();
    if (typeof window != "undefined") {
      if (professions.length) {
        const auxURLParams = getParamsFromURL(window.location.href, [
          "profesion",
        ]);
        const auxProfessions = professions.filter((profession: Profession) => {
          return profession.slug === auxURLParams.profesion;
        });
        setStoreURLParams(auxProfessions);
        applyFilters();
      }
    }
  }, [window.location.search, professions]);
  const [currentPage, setCurrentPage] = useState(1);

  const { storeFilters, addFilter, removeFilter, updateFilter, clearFilters } =
    useStoreFilters();
  const itemsPerPage = 18;

  // Calcular el índice del primer y último elemento en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Obtener los elementos de la página actual
  const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Función para cambiar la página
  const pathname = usePathname();
  const handlePageChange = (pageNumber: number) => {
    const pageExists = storeFilters.page.some(
      (item: PageFilter) => item.id === pageNumber
    );

    if (!pageExists) {
      // Si la página seleccionada no existe en los filtros de página, la agregamos
      updateFilter("page", {
        id: pageNumber,
        name: String(pageNumber),
        total: totalPages,
      });

      // Calculamos el índice del primer elemento en la página actual
      const indexOfFirstItem = (pageNumber - 1) * itemsPerPage;
      // Calculamos los elementos de la página actual
      const currentItems = products.slice(
        indexOfFirstItem,
        indexOfFirstItem + itemsPerPage
      );
      // Actualizamos el estado con los elementos de la página actual y el número de página actual
      setCurrentItems(currentItems);
      setCurrentPage(pageNumber);
    } else {
      // Si la página ya existe en los filtros de página, la eliminamos
      removeFilter("page", { id: pageNumber, name: String(pageNumber) });
    }
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

  const applyFilters = () => {
    const selectedSpecialties = storeFilters.specialties.map(
      (filter: Specialty) => filter.name
    );
    const selectedProfessions = storeFilters.professions.map(
      (filter: Profession) => filter.slug
    );
    const selectedResources = storeFilters.resources.map(
      (filter: ResourceFilter) => filter.name
    );
    const selectedDurations = storeFilters.duration.map(
      (filter: DurationFilter) => filter.value
    );
    console.log("ENTRO", selectedProfessions.length);

    if (
      !(
        selectedSpecialties.length ||
        selectedProfessions.length ||
        selectedResources.length ||
        selectedDurations.length
      )
    ) {
      setLocalProducts(products);
    } else {
      const filteredProducts = products.filter((product) => {
        const prodSpecialties = product.categories.map(
          (category) => category.name
        );
        const prodProfessions = product.professions.map(
          (profession) => profession.name
        );
        const prodDuration = product.duration;
        let specialtiesMatch = true;
        if (selectedSpecialties.length) {
          specialtiesMatch = selectedSpecialties.some((specialty) =>
            prodSpecialties.includes(specialty)
          );
        }

        if (
          storeURLParams &&
          !selectedProfessions.includes(storeURLParams.slug)
        ) {
          selectedProfessions.push(storeURLParams.slug);
        }
        const professionsMatch =
          selectedProfessions.length === 0 ||
          selectedProfessions.some((profession) =>
            prodProfessions.some((prodProfession) =>
              prodProfession.toLowerCase().includes(profession?.toLowerCase())
            )
          );

        const resourcesMatch = selectedResources
          .filter((e: string) => e != undefined)
          .every((resource) => {
            if (resource === "Curso") {
              return product.father_post_type === "course";
            } else if (resource === "Guías profesionales") {
              return product.father_post_type === "downloadable";
            }
          });

        const durationsMatch = selectedDurations.every((duration) => {
          const currentDuration = parseInt(prodDuration);
          switch (duration) {
            case "less_100":
              return currentDuration <= 100;
            case "100_300":
              return currentDuration > 100 && currentDuration <= 300;
            case "more_300":
              return currentDuration > 300;
          }
        });

        return (
          // specialtiesMatch &&
          professionsMatch && resourcesMatch && durationsMatch
        );
      });

      console.log("Filtered Products", filteredProducts);
      setCurrentItems(
        filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
      );

      // setLocalProducts(filteredProducts);
    }
  };
  // const triggerFilter = (event: any) => {
  //   let sortedProducts: FetchCourseType[] = [];
  //   // setLoading(true);

  //   switch (event) {
  //     case "":
  //       sortedProducts = [...auxProducts];
  //       break;
  //     case "novedades":
  //       sortedProducts = [...products]; // Create a copy of products
  //       sortedProducts.sort((a, b) => {
  //         const isNewA = Boolean(a.is_new);
  //         const isNewB = Boolean(b.is_new);
  //         if (isNewA === isNewB) {
  //           return 0;
  //         } else if (isNewA) {
  //           return -1;
  //         } else {
  //           return 1;
  //         }
  //       });
  //       break;
  //     case "mas_horas":
  //       sortedProducts = [...products];
  //       sortedProducts.sort((a, b) => {
  //         let durationA = parseInt(a.duration);
  //         let durationB = parseInt(b.duration);

  //         if (isNaN(durationA)) {
  //           durationA = 0;
  //         }
  //         if (isNaN(durationB)) {
  //           durationB = 0;
  //         }
  //         if (durationA < durationB) {
  //           return 1;
  //         }
  //         if (durationA > durationB) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //       break;
  //     case "menos_horas":
  //       sortedProducts = [...products];
  //       sortedProducts.sort((a, b) => {
  //         let durationA = parseInt(a.duration);
  //         let durationB = parseInt(b.duration);
  //         if (isNaN(durationA)) {
  //           durationA = 0;
  //         }
  //         if (isNaN(durationB)) {
  //           durationB = 0;
  //         }
  //         if (durationA > durationB) {
  //           return 1;
  //         }
  //         if (durationA < durationB) {
  //           return -1;
  //         }
  //         return 0;
  //       });
  //       break;
  //     default:
  //       break;
  //   }

  // setLoading(false);
  // setProducts(sortedProducts);
  // };

  useEffect(() => {
    setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
    setLocalProducts(products);
    setAllProducts(products);
  }, [products]);

  return (
    <section className="container course-content-area pb-90 animate-fade-down px-0">
      {/* {localProducts.length} */}
      {storeFilters.specialties.length > 0 && (
        <h1 className="text-xl sm:text-3xl mb-10">
          Cursos de {storeFilters.specialties[0].name}
        </h1>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-[28%_72%] gap-4 mb-10">
        <div className="hidden lg:flex flex-col">
          <StoreSideBar
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
            professions={professions}
          />
        </div>
        <div>
          {/* <StoreBar
            onSearch={(e) => triggerSearch(e)}
            onFilter={(e) => triggerFilter(e)}
            length={products.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          /> */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
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
                <img src="/images/icons/no_items.svg" className="mb-5" />
                <p>
                  No hay resultados para tu búsqueda.
                  <br />
                  Modifica los filtros y encuentra tu curso ideal.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center md:justify-start">
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
