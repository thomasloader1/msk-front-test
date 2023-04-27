import { FC, useEffect, useState } from "react";
import StoreLayout from "./store/StoreLayout";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";
import axios from "axios";
import LoadingImage from "components/Loader/Image";
import { Helmet } from "react-helmet";
import { FetchCourseType } from "data/types";
import { useStoreFilters } from "context/storeFilters/StoreContext";
import { API_URL } from "data/api";

export interface PageStoreProps {
  className?: string;
}

const PageStore: FC<PageStoreProps> = ({ className = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const [specialties, setSpecialties] = useState([]);
  const [professions, setProfessions] = useState([]);
  const { storeFilters } = useStoreFilters();

  // FETCH DATA
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/products`)
      .then((response) => {
        setLoading(false);
        setAuxProducts([...response.data.products]);
        setProducts(response.data.products);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    axios
      .get("https://msklatam.com/msk-laravel/public/api/professions")
      .then((response) => {
        setProfessions(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });

    axios
      .get("https://msklatam.com/msk-laravel/public/api/specialities")
      .then((response) => {
        setSpecialties(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  // FILTERS
  useEffect(() => {
    filterBySpecialtiesAndProfessions();
  }, [storeFilters]);

  const filterBySpecialtiesAndProfessions = () => {
    const selectedSpecialties = storeFilters.specialties.map(
      (filter: any) => filter.name
    );
    const selectedProfessions = storeFilters.professions.map(
      (filter: any) => filter.name
    );
    if (!(selectedSpecialties.length || selectedProfessions.length)) {
      setProducts(auxProducts);
    } else {
      const filteredProducts = products.filter((product) => {
        const prodSpecialties = product.categories.map(
          (category) => category.name
        );
        const prodProfessions = product.professions.map(
          (profession) => profession.name
        );
        const specialtiesMatch = selectedSpecialties.every((specialty) =>
          prodSpecialties.includes(specialty)
        );
        const professionsMatch = selectedProfessions.every((profession) =>
          prodProfessions.some((prodProfession) => {
            console.log(prodProfession, profession);
            return prodProfession
              .toLowerCase()
              .includes(profession.toLowerCase());
          })
        );

        return specialtiesMatch && professionsMatch;
      });
      setProducts(filteredProducts);
    }
  };

  const triggerSearch = (event: any) => {
    const filteredProducts = auxProducts.filter((product) =>
      product.title.toLowerCase().includes(event)
    );
    setProducts(filteredProducts);
  };

  const triggerFilter = async (event: any) => {
    let sortedProducts: FetchCourseType[] = [];
    setLoading(true);
    switch (event) {
      case "":
        sortedProducts = [...auxProducts];
        break;
      case "newer":
        sortedProducts = products.sort((a, b) => {
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
      case "duration":
        sortedProducts = await products.sort((a, b) => {
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
    <div className={`nc-PageStore ${className}`} data-nc-id="PageStore">
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
