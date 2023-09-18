import { FC, useEffect, useState } from "react";
import StoreLayout from "./store/StoreLayout";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";
import LoadingImage from "components/Loader/Image";
import { Helmet } from "react-helmet";
import {
  DurationFilter,
  FetchCourseType,
  Profession,
  ResourceFilter,
  Specialty,
} from "data/types";
import api from "Services/api";
import { useStoreFilters } from "context/storeFilters/StoreFiltersProvider";

export interface PageStoreProps {
  className?: string;
}

const PageStore: FC<PageStoreProps> = ({ className = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const [specialties, setSpecialties] = useState([]);
  const [professions, setProfessions] = useState([]);
  const { storeFilters, clearFilters } = useStoreFilters();

  //
  // FETCH DATA
  const fetchProducts = async () => {
    const productList = await api.getAllCourses();
    setAuxProducts([...productList]);
    setProducts(productList);
    setLoading(false);
  };
  const fetchProfessions = async () => {
    const professionList = await api.getStoreProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialtiesStore();
    setSpecialties(specialtyList);
  };

  useEffect(() => {
    clearFilters();
    setLoading(true);

    fetchProducts();
    fetchProfessions();
    fetchSpecialties();
  }, []);

  // FILTERS
  useEffect(() => {
    applyFilters();
  }, [storeFilters]);

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

    if (
      !(
        selectedSpecialties.length ||
        selectedProfessions.length ||
        selectedResources.length ||
        selectedDurations.length
      )
    ) {
      setProducts(auxProducts);
    } else {
      const filteredProducts = auxProducts.filter((product) => {
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
              prodProfession.toLowerCase().includes(profession.toLowerCase())
            )
          );

        const resourcesMatch = selectedResources.every((resource) => {
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
          specialtiesMatch &&
          professionsMatch &&
          resourcesMatch &&
          durationsMatch
        );
      });

      setProducts(filteredProducts);
    }
  };

  const removeAccents = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };
  const triggerSearch = (event: any) => {
    if (event) {
      const filteredProducts = auxProducts.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(
          removeAccents(event.toLowerCase())
        )
      );
      setProducts(filteredProducts);
    } else {
      setProducts(auxProducts);
      applyFilters();
    }
  };

  const triggerFilter = (event: any) => {
    let sortedProducts: FetchCourseType[] = [];
    setLoading(true);

    switch (event) {
      case "":
        sortedProducts = [...auxProducts];
        break;
      case "novedades":
        sortedProducts = [...products]; // Create a copy of products
        sortedProducts.sort((a, b) => {
          const isNewA = Boolean(a.is_new);
          const isNewB = Boolean(b.is_new);
          if (isNewA === isNewB) {
            return 0;
          } else if (isNewA) {
            return -1;
          } else {
            return 1;
          }
        });
        break;
      case "mas_horas":
        sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
          let durationA = parseInt(a.duration);
          let durationB = parseInt(b.duration);

          if (isNaN(durationA)) {
            durationA = 0;
          }
          if (isNaN(durationB)) {
            durationB = 0;
          }
          if (durationA < durationB) {
            return 1;
          }
          if (durationA > durationB) {
            return -1;
          }
          return 0;
        });
        break;
      case "menos_horas":
        sortedProducts = [...products];
        sortedProducts.sort((a, b) => {
          let durationA = parseInt(a.duration);
          let durationB = parseInt(b.duration);
          if (isNaN(durationA)) {
            durationA = 0;
          }
          if (isNaN(durationB)) {
            durationB = 0;
          }
          if (durationA > durationB) {
            return 1;
          }
          if (durationA < durationB) {
            return -1;
          }
          return 0;
        });
        break;
      default:
        break;
    }

    setLoading(false);
    setProducts(sortedProducts);
  };

  let loaders = [];
  for (let i = 0; i < 9; i++) {
    loaders.push(<LoadingImage key={`loader_${i}`} />);
  }
  return (
    <div
      className={`nc-PageStore ${className} animate-fade-down`}
      data-nc-id="PageStore"
    >
      {/* === SEO === */}
      <Helmet>
        <html lang="es" />
        <title>MSK | Tienda</title>
        <meta
          name="description"
          content="Una propuesta moderna para expandir tus metas profesionales"
        />
      </Helmet>
      {/* === END SEO === */}

      <StoreLayout
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreBar
            onSearch={(e) => triggerSearch(e)}
            onFilter={(e) => triggerFilter(e)}
            length={products.length}
            filtersCount={
              storeFilters.specialties.length +
              storeFilters.professions.length +
              storeFilters.resources.length +
              storeFilters.duration.length
            }
          />
          {isLoading ? (
            <div className="container grid grid-cols-3 gap-10">
              {loaders.map((loader) => {
                return loader;
              })}
            </div>
          ) : (
            <StoreContent
              products={products}
              specialties={specialties}
              professions={professions}
            />
          )}
        </section>
      </StoreLayout>
    </div>
  );
};

export default PageStore;
