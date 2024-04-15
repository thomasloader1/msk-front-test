"use client";
import React, {FC, useEffect, useState} from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import {
  DurationFilter,
  FetchCourseType,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import {useStoreFilters} from "@/context/storeFilters/StoreFiltersProvider";
import StoreBar from "./StoreBar";
import {getParamsFromURL} from "@/lib/removeUrlParams";
import {useSearchParams} from "next/navigation";
import {removeAccents} from "@/lib/removeAccents";
import api from "../../../../Services/api";
import {filterStoreProducts} from "@/lib/storeFilters";
import Breadcrum from "@/components/Breadcrum/Breadcrum";

interface Props {
  products: FetchCourseType[];
  productsLength: number;
  specialties?: any;
  // handleTriggerSearch: (e: any) => void;
  // handleTriggerFilter: (e: any) => void;
}

const StoreContent: FC<Props> = ({
                                   products,
                                   productsLength,
                                   specialties,
                                   // handleTriggerSearch,
                                   // handleTriggerFilter,
                                 }) => {

  const [allProducts, setAllProducts] = useState<FetchCourseType[]>(products);
  const [professions, setProfessions] = useState([]);

  const fetchProfessions = async () => {
    const professionList = await api.getStoreProfessions();
    setProfessions(professionList);
  };

  if (typeof window != "undefined") {
    useEffect(() => {
      if (!professions.length) fetchProfessions();
      if (professions.length) {
        const auxURLParams = getParamsFromURL(window.location.href, [
          "profesion",
        ]);
        const auxProfessions = professions.filter((profession: Profession) => {
          return profession.slug === auxURLParams.profesion;
        });
      }
      applyFilters();
    }, [window.location.search, professions]);
  }

  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState((Number(searchParams.get('page')) || 1));

  const {
    storeFilters,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    clearSpecialties,
  } = useStoreFilters();

  const itemsPerPage = 18;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);
  const [totalPages, setTotalPages] = useState(Math.ceil(allProducts.length / itemsPerPage));

  const handlePageChange = (pageNumber: number) => {
    console.log('HANDLING PAGE CHANGE');
    const pageExists = storeFilters.page.some((item: PageFilter) => item.id === pageNumber);
    //console.log({pageExists, storePage: storeFilters.page, pageNumber})
    if (!pageExists) {
      updateFilter("page", {
        id: pageNumber,
        name: String(pageNumber),
        total: totalPages,
      });
      const indexOfFirstItem = (pageNumber - 1) * itemsPerPage;
      const currentItems = products.slice(
        indexOfFirstItem,
        indexOfFirstItem + itemsPerPage
      );
      setCurrentItems(currentItems);
      setCurrentPage(pageNumber);
    } else {
      removeFilter("page", {id: pageNumber, name: String(pageNumber)});
    }
  };

  useEffect(() => {
    console.log('PRODUCTS WERE UPDATED', products);
    if (products) {
      setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
      setAllProducts(products);
      setCurrentPage(currentPage);
    }
  }, [products]);

  // STOREBAR FILTERS

  const handleTriggerSearch = (event: any) => {
    applyFilters();
    if (event) {
      const filteredProducts = products.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(event.toLowerCase())
        )
      );
      console.log(filteredProducts);
      setCurrentItems(
        filteredProducts.slice(indexOfFirstItem, indexOfLastItem)
      );
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(currentPage);
    } else {
      setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
      setTotalPages(Math.ceil(products.length / itemsPerPage));
      setCurrentPage(currentPage);
    }
  };

  const triggerFilter = (event: any) => {
    setCurrentItems(filterStoreProducts(products, event));
  };

  // END STOREBAR FILTERS

  const onChangeSpecialty = (specialty: Specialty) => {
    //Clear store search bar
    const input = document.getElementById("store-search") as HTMLInputElement;
    if (input) {
      input.value = "";
    }
    if (specialty == null) {
      clearSpecialties();
    } else {
      console.log('Adding filter');
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
    console.log('Durationnnn', duration);
    const durationExists = storeFilters.duration.filter(
      (item: DurationFilter) => {
        return item.slug == duration.slug;
      }
    );
    console.log('Duration Exists', durationExists);
    if (durationExists.length) {
      removeFilter("duration", duration);
    } else addFilter("duration", duration);
  };

  const applyFilters = () => {

  console.group("applyFilters()")
    console.log("Store Filters", {storeFilters});
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
      (filter: DurationFilter) => filter.slug
    );
     const selectedPage = storeFilters.page.map(
      (filter: PageFilter) => filter.id
    );

    console.group("FILTERS SELECTED")
      console.log('SPECIALTIES', selectedSpecialties);
      console.log('RESOURCES', selectedResources);
      console.log('PROFESSIONS', selectedProfessions);
      console.log('DURATIONS', selectedDurations);
      console.log('PAGE', selectedPage);
    console.groupEnd()

    if ( //No filters, set the products to the original list
      !(
        selectedSpecialties.length ||
        selectedProfessions.length ||
        selectedResources.length ||
        selectedDurations.length
      )
    ) {
      console.log('SET LOCAL PRODUCTS', products);
      setCurrentItems([...products.slice(indexOfFirstItem, indexOfLastItem)]);
      setTotalPages(Math.ceil(products.length / itemsPerPage));
    } else { //There are filters we need to apply
      console.log('There are filters we need to apply');
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
              //console.log({resource, type: product.father_post_type},product.father_post_type === "course")
              return product.father_post_type === "course";
            } else if (resource === "Guías profesionales") {
              return product.father_post_type === "downloadable";
            }
          });

        let durationsMatch = true;
        if (selectedDurations && selectedDurations.length) {
          durationsMatch = selectedDurations.some((duration) => {
            const currentDuration = parseInt(prodDuration);
            switch (duration) {
              case "dur_1":
                return currentDuration <= 100;
              case "dur_2":
                return currentDuration > 100 && currentDuration <= 300;
              case "dur_3":
                return currentDuration > 300;
            }
          });
        }

        return specialtiesMatch
          && professionsMatch
          && resourcesMatch
          && durationsMatch
      });
      console.log("FILTERED PRODUCTS", filteredProducts);
      setCurrentItems([...filteredProducts.slice(indexOfFirstItem, indexOfLastItem)]);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(currentPage);
    }
  console.groupEnd()

  };

  return (
    <section className="container course-content-area pb-90 animate-fade-down px-0">

      <Breadcrum />


      {storeFilters.specialties.length > 0 && (
        <h1 className="text-xl sm:text-3xl mb-10">
          Cursos de {storeFilters.specialties[0].name}
        </h1>
      ) }

      <div className="grid grid-cols-1 lg:grid-cols-[28%_72%] gap-4 mb-10">
        <div className="hidden lg:flex flex-col">
          <StoreSideBar
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
            professions={professions}
            specialties={specialties}
          />
        </div>
        <div>
          <StoreBar
            onSearch={handleTriggerSearch}
            onFilter={triggerFilter}
            length={products.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-12">
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
              <div
                className="text-center col-span-1 md:col-span-2 lg:col-span-3 flex flex-col justify-center items-center h-[350px]">
                <img src="/images/icons/no_items.svg" className="mb-5"/>
                <p>
                  No hay resultados para tu búsqueda.
                  <br/>
                  Modifica los filtros y encuentra tu curso ideal.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center md:justify-start">
            {/*<p>Total pages: {totalPages}</p>*/}
            <StorePagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              urlTrack={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
