import StoreLayout from "./store/StoreLayout";
import { CheckIcon } from "@heroicons/react/solid";
import React, { FC, useEffect, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";
import { HOME_COURSES } from "data/MSK/courses";
import axios from "axios";
import Skeleton from "components/Skeleton/Skeleton";
import LoadingImage from "components/Loader/Image";
import { FetchCourseType } from "data/types";

export interface PageSubcriptionProps {
  className?: string;
}

const PageStore: FC<PageSubcriptionProps> = ({ className = "" }) => {
  const [isLoading, setLoading] = useState(false);
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const [specialties, setSpecialties] = useState([]);
  const [professions, setProfessions] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://wp.msklatam.com/wp-json/wp/api/products")
      .then((response) => {
        setLoading(false);
        setAuxProducts(response.data.products);
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

  const triggerSearch = (event: any) => {
    const filteredProducts = auxProducts.filter((product) =>
      product.title.toLowerCase().includes(event)
    );
    setProducts(filteredProducts);
  };

  let loaders = [];
  for (let i = 0; i < 9; i++) {
    loaders.push(<LoadingImage key={`loader_${i}`} />);
  }
  return (
    <div
      className={`nc-PageSubcription ${className}`}
      data-nc-id="PageSubcription"
    >
      <StoreLayout
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreBar
            onSearch={(e) => triggerSearch(e)}
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
