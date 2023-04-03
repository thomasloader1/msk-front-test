import LayoutPageFluid from "components/LayoutPage/LayoutPageFluid";
import { CheckIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import StoreBar from "components/Store/StoreBar";
import StoreContent from "components/Store/StoreContent";

export interface PageSubcriptionProps {
  className?: string;
}

const PageStore: FC<PageSubcriptionProps> = ({ className = "" }) => {

  return (
    <div
      className={`nc-PageSubcription ${className}`}
      data-nc-id="PageSubcription"
    >
      <LayoutPageFluid
        subHeading="Pricing to fit the needs of any companie size."
        headingEmoji="💎"
        heading="Store"
      >
        <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
            <StoreBar />
            <StoreContent />
        </section>
      </LayoutPageFluid>
    </div>
  );
};

export default PageStore;
