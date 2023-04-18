import SingleProductDetail from "components/SingleProductDetail/SingleProductDetail";
import React from "react";
import { HOME_COURSES } from "data/courses";

const PageSingleProduct = () => {
  return (
    <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        <SingleProductDetail product={HOME_COURSES[0]} />
      </section>
    </div>
  );
};

export default PageSingleProduct;
