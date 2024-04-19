"use client";
import React, {FC, useContext, useEffect, useState} from "react";
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
import {useStoreFilters} from "@/context/storeFilters/StoreProvider";
import StoreBar from "./StoreBar";
import {useSearchParams} from "next/navigation";
import {removeAccents} from "@/lib/removeAccents";
import {filterStoreProducts} from "@/lib/storeFilters";
import Breadcrum from "@/components/Breadcrum/Breadcrum";
import StoreSkeleton from "@/components/Skeleton/StoreSkeleton";
import NoResultFound from "@/components/NoResultFound";
import resourcesMapping from "@/data/jsons/__resources.json";
import durationsMapping from "../../../data/jsons/__durations.json";

import {slugifySpecialty} from "@/lib/Slugify";
import {getAllCourses, setAllCourses} from "@/lib/allData";
import ssr from "@Services/ssr";
import {CountryContext} from "@/context/country/CountryContext";

interface Props {
  specialties?: any;
  professions?: any;
}

let resources = resourcesMapping;
let durations = durationsMapping;

const StoreContent: FC<Props> = ({ professions }) => {
  let {
    storeFilters,
    addFilter,
    removeFilter,
    updateFilter,
    clearFilters,
    clearSpecialties,
  } = useStoreFilters();

  const { specialties } = useStoreFilters();

  const { countryState } = useContext(CountryContext);

  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<FetchCourseType[]>([]);
  const [currentItems, setCurrentItems] = useState<FetchCourseType[]>([]);

  const [mutationProducts, setMutationProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState((Number(searchParams.get('page')) || 1));
  const itemsPerPage = 18;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const [totalPages, setTotalPages] = useState(Math.ceil(allProducts.length / itemsPerPage));

  const [currentResource, setCurrentResource] = useState<string | null>();
  const [currentSpecialty, setCurrentSpecialty] = useState<string | null>();
  const [currentDuration, setCurrentDuration] = useState<string | null>();
  const [currentProfession, setCurrentProfession] = useState<string | null>();

  let products: FetchCourseType[] = [];
  // @ts-ignore
  useEffect(async () => {
    if (!getAllCourses().length) {
      products = await ssr.getAllCourses(countryState.country);
      setAllCourses(products);
      setCurrentItems(products.slice(indexOfFirstItem, indexOfLastItem));
      setAllProducts(products);
    }
  }, [countryState.country]);


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
      if (products){
        const currentItems = products.slice(
          indexOfFirstItem,
          indexOfFirstItem + itemsPerPage
        );
        setCurrentItems(currentItems);
        setCurrentPage(pageNumber);
      }
    } else {
      removeFilter("page", {id: pageNumber, name: String(pageNumber)});
    }
  };

  // STOREBAR FILTERS

  const handleTriggerSearch = (event: any) => {
    if (products){
      if (event) {
        const filteredProducts = products.filter((product) =>
          removeAccents(product.title.toLowerCase()).includes(
            removeAccents(event.toLowerCase())
          )
        );
        console.log("handleTriggerSearch",{filteredProducts});
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
    }
  };

  const triggerFilter = (event: any) => {
    if (products){
      setCurrentItems(filterStoreProducts(products, event));
    }
  };

  // END STOREBAR FILTERS

  const onChangeSpecialty = (specialty: Specialty, action: string) => {
    //Clear store search bar
    const input = document.getElementById("store-search") as HTMLInputElement;
    if (input) { input.value = "";}
    if (action == 'delete') {
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
  const onChangeResource = (resource: ResourceFilter, action : string) => {
    console.log('onChangeResource running');
    if (action !== 'add') {
      removeFilter("resources", resource);
    } else addFilter("resources", resource);
  };
  const onChangeDuration = (duration: DurationFilter, action: string) => {
    console.log('Duration', duration);
    if (action !== 'add') {
      removeFilter("duration", duration);
    } else addFilter("duration", duration);
  };

  const applyFilters = () => {
    setMutationProducts(true)
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

    console.log("condition filter apply",{selectedSpecialties,selectedProfessions,selectedResources,selectedDurations,selectedPage})

    if (!(selectedSpecialties.length || selectedProfessions.length || selectedResources.length || selectedDurations.length)) {
      console.log('No filters');
      // No filters, set the products to the original list

      setCurrentItems([...allProducts.slice(indexOfFirstItem, indexOfLastItem)]);
      setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
      setMutationProducts(false)

    } else {
      console.log('There are filters we need to apply',{selectedSpecialties, selectedProfessions, selectedResources, selectedDurations, selectedPage});

      const filteredProducts = allProducts.filter((product) => {
        const prodSpecialties = product.categories.map((category) => category.name);
        const prodProfessions = product.professions.map((profession) => profession.name);
        const prodDuration = product.duration;

        let specialtiesMatch = true;

        if (selectedSpecialties.length) {
          specialtiesMatch = selectedSpecialties.some((specialty) => prodSpecialties.includes(specialty));
        }

        const professionsMatch =
          selectedProfessions.length === 0 ||
          selectedProfessions.some((profession) =>
            prodProfessions.some((prodProfession) =>
              prodProfession.toLowerCase().includes(profession?.toLowerCase())
            )
          );

        const resourcesMatch = selectedResources.filter((e: string) => e != undefined).every((resource) => {
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

        return specialtiesMatch && professionsMatch && resourcesMatch && durationsMatch
      });

      console.log("FILTERED PRODUCTS", {filteredProducts});

      setCurrentItems([...filteredProducts.slice(indexOfFirstItem, indexOfLastItem)]);
      setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
      setCurrentPage(currentPage);
      setMutationProducts(false)

    }
    console.groupEnd()
  };

  if(typeof window !== "undefined") {
    useEffect(() => {
      console.log('FILTERS WERE UPDATED');
      applyFilters();
    }, [storeFilters.page, storeFilters.specialties, storeFilters.professions, storeFilters.resources, storeFilters.duration]);
  }

  if(typeof window !== "undefined") {
    useEffect(() => {
      console.log("Store Component rendered, check URL to apply filters");
      //if the url has the search param recurso call onChange() for that resource
      const url = new URL(window.location.href);
      const recurso = url.searchParams.get("recurso");
      const especialidad = url.searchParams.get("especialidad");
      const profesion = url.searchParams.get("profesion");
      const duracion = url.searchParams.get("duracion");
      if (recurso){
        let urlResource = resources.find((resource) => resource.slug === recurso);
        console.log('URL RESOURCE: ', urlResource);
        if (urlResource){
          onChangeResource(urlResource, 'add');
          setCurrentResource(urlResource.slug);
        }
      }

      if (especialidad && specialties){
        console.log('SPECIALTIES: ', specialties);
        let urlSpecialty = specialties.find((specialty: any) => slugifySpecialty(specialty.name) === especialidad);
        console.log('URL SPECIALTY: ', urlSpecialty);
        if (urlSpecialty){
          onChangeSpecialty(urlSpecialty, 'add');
          setCurrentSpecialty(slugifySpecialty(urlSpecialty.name));
        }
      }
      if (profesion){
        let urlProfession = professions.find((profession: any) => profession.slug === profesion);
        if (urlProfession){
          onChangeProfession(urlProfession);
          setCurrentProfession(urlProfession.slug);
        }
      }
      if(duracion){
        let urlDuration = durations.find((duration) => duration.slug === duracion);
        if (urlDuration){
          onChangeDuration(urlDuration, 'add');
          setCurrentDuration(urlDuration.slug);
        }
      }
    }, [specialties, allProducts]);
  }

  return (
    <section className="container course-content-area pb-90 animate-fade-down px-0">
      <Breadcrum />

      {storeFilters.specialties.length > 0 && (<h1 className="text-xl sm:text-3xl mb-10">Cursos de {storeFilters.specialties[0].name}</h1>)}

      <div className="grid grid-cols-1 lg:grid-cols-[28%_72%] gap-4 mb-10">
        <div className="hidden lg:flex flex-col">
          <StoreSideBar
            onChangeSpecialty={onChangeSpecialty}
            onChangeProfession={onChangeProfession}
            onChangeResource={onChangeResource}
            onChangeDuration={onChangeDuration}
            currentResource={currentResource}
            currentSpecialty={currentSpecialty}
            currentDuration={currentDuration}
            currentProfession={currentProfession}
            setCurrentResource={setCurrentResource}
            setCurrentSpecialty={setCurrentSpecialty}
            setCurrentDuration={setCurrentDuration}
           setCurrentProfession={setCurrentProfession}/>
        </div>
        <div>
          <StoreBar
            onSearch={handleTriggerSearch}
            onFilter={triggerFilter}
            length={currentItems.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-12">
            {(currentItems.length && !mutationProducts) ? (
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
              <>
                { mutationProducts ? <StoreSkeleton /> : <NoResultFound /> }
              </>
            )}
          </div>

          <div className="flex justify-center md:justify-start">
            {/*<p>Total pages: {totalPages}</p>*/}
            {!mutationProducts && ( <StorePagination
              totalPages={totalPages}
              onPageChange={handlePageChange}
              currentPage={currentPage}
              urlTrack={true}
            />)}

          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
