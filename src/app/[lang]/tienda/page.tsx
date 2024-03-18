import { FC, useContext, useEffect, useState } from "react";
import StoreLayout from "@/components/MSK/StoreLayout";
import StoreBar from "@/components/MSK/Store/StoreBar";
import StoreContent from "@/components/MSK/Store/StoreContent";
import LoadingImage from "@/components/MSK/Loader/Image";
import {
  DurationFilter,
  FetchCourseType,
  PageFilter,
  Profession,
  ResourceFilter,
  Specialty,
} from "@/data/types";
import { useStoreFilters } from "@/context/storeFilters/StoreFiltersProvider";
import { CountryContext } from "@/context/country/CountryContext";
import { DataContext } from "@/context/data/DataContext";
import api from "../../../../Services/api";
import PageHead from "@/components/MSK/PageHead";
import { cookies } from "next/headers";
import ssr from "../../../../Services/ssr";
export const runtime = 'edge';

export interface PageStoreProps {
  className?: string;
  params?: any;
}

const PageStore: FC<PageStoreProps> = async ({ className = "", params }) => {
  console.log("SSR", params);
  const currentCountry = params.lang || cookies().get("country")?.value;

  const allCourses = await ssr.getAllCourses(currentCountry);
  const allBestSellers = await ssr.getBestSellers(currentCountry);
  const allPosts = await ssr.getPosts(currentCountry);
  // const { state: dataState, loadingCourses } = useContext(DataContext);
  // const { allCourses, allProfessions, allSpecialties } = dataState;
  // const { storeFilters, clearFilters } = useStoreFilters();
  // const { state, dispatch } = useContext(CountryContext);
  // const [professions, setProfessions] = useState<Profession[]>([]);
  // const [specialties, setSpecialties] = useState<Specialty[]>([]);

  // const fetchProfessions = async () => {
  //   const professionList = await api.getStoreProfessions();
  //   setProfessions(professionList);
  // };
  // const fetchSpecialties = async () => {
  //   const specialtyList = await api.getSpecialtiesStore();
  //   setSpecialties(specialtyList);
  // };

  // useEffect(() => {
  //   clearFilters();
  //   fetchProfessions();
  //   fetchSpecialties();
  //   setLoading(false);
  //   applyFilters();
  // }, []);

  // useEffect(() => {
  //   if (state && state.error) {
  //     console.log("ERROR:", state.error);
  //     setTimeout(() => {
  //       // history.push(history.location.pathname);
  //     }, 1500);
  //   }
  // }, [state]);

  // FETCH DATA
  // useEffect(() => {
  //   setAuxProducts([...allCourses]);
  //   setProducts(allCourses);
  //   setLoading(false);
  // }, [allCourses, allProfessions, allSpecialties, loadingCourses]);

  // FILTERS
  // useEffect(() => {
  //   console.table(storeFilters);
  //   applyFilters();
  // }, [storeFilters]);

  // console.table(storeFilters, selectedSpecialties);

  // if (
  //   !(
  //     selectedSpecialties.length ||
  //     selectedProfessions.length ||
  //     selectedResources.length ||
  //     selectedDurations.length
  //   )
  // ) {
  //   setProducts(auxProducts);
  // } else {
  //   const filteredProducts = auxProducts.filter((product) => {
  //     const prodSpecialties = product.categories.map(
  //       (category) => category.name
  //     );
  //     const prodProfessions = product.professions.map(
  //       (profession) => profession.name
  //     );
  //     const prodDuration = product.duration;

  //     let specialtiesMatch = true;
  //     if (selectedSpecialties.length) {
  //       specialtiesMatch = selectedSpecialties.some((specialty) =>
  //         prodSpecialties.includes(specialty)
  //       );
  //     }

  //     const professionsMatch =
  //       selectedProfessions.length === 0 ||
  //       selectedProfessions.some((profession) =>
  //         prodProfessions.some((prodProfession) =>
  //           prodProfession.toLowerCase().includes(profession.toLowerCase())
  //         )
  //       );

  //     const resourcesMatch = selectedResources.every((resource) => {
  //       if (resource === "Curso") {
  //         return product.father_post_type === "course";
  //       } else if (resource === "Guías profesionales") {
  //         return product.father_post_type === "downloadable";
  //       }
  //     });

  //     const durationsMatch = selectedDurations.every((duration) => {
  //       const currentDuration = parseInt(prodDuration);
  //       switch (duration) {
  //         case "less_100":
  //           return currentDuration <= 100;
  //         case "100_300":
  //           return currentDuration > 100 && currentDuration <= 300;
  //         case "more_300":
  //           return currentDuration > 300;
  //       }
  //     });

  //     return (
  //       specialtiesMatch &&
  //       professionsMatch &&
  //       resourcesMatch &&
  //       durationsMatch
  //     );
  //   });

  //   setProducts(filteredProducts);
  // }
  // };

  // let loaders = [];
  // for (let i = 0; i < 9; i++) {
  //   loaders.push(<LoadingImage key={`loader_${i}`} />);
  // }

  // const prioryTitleStore =
  //   storeFilters?.specialties[0]?.name &&
  //   `Cursos de ${storeFilters.specialties[0].name}`;

  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      {/* === SEO === */}
      {/* <PageHead
        title="Tienda"
        description="Una propuesta moderna para expandir tus metas profesionales"
        // prioryTitle={prioryTitleStore ?? null}
      /> */}
      {/* === END SEO === */}

      <StoreLayout
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreContent
            products={allCourses}
            productsLength={allCourses.length}
            // handleTriggerSearch={triggerSearch}
            // handleTriggerFilter={triggerFilter}
          />
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
