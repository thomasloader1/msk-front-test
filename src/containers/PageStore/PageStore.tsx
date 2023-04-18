import LayoutPageSwiper from "components/LayoutPage/LayoutPageSwiper";
import { CheckIcon } from "@heroicons/react/solid";
import React, { FC, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";
import { HOME_COURSES } from "data/courses";

export interface PageSubcriptionProps {
  className?: string;
}

const PageStore: FC<PageSubcriptionProps> = ({ className = "" }) => {
  const [productList, setProductList] = useState(HOME_COURSES);
  const triggerSearch = (event: any) => {
    const auxProducts = HOME_COURSES.filter((product) =>
      product.title.toLowerCase().includes(event)
    );
    setProductList(auxProducts);
  };
  return (
    <div
      className={`nc-PageSubcription ${className}`}
      data-nc-id="PageSubcription"
    >
      <LayoutPageSwiper
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
          <StoreBar onSearch={(e) => triggerSearch(e)} />
          <StoreContent products={productList} />
        </section>
      </LayoutPageSwiper>
    </div>
  );
};

export default PageStore;
