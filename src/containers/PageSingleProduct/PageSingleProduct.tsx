import SingleProductDetail from "components/SingleProductDetail/SingleProductDetail";
import React, { useEffect, useState } from "react";
import { HOME_COURSES } from "data/MSK/courses";
import { FetchCourseType } from "data/types";
import axios from "axios";
import LoadingText from "components/Loader/Text";

const PageSingleProduct = () => {
  const slug = window.location.pathname.split("/").pop();
  const [product, setProduct] = useState<FetchCourseType>();
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (slug) {
      axios
        .get(`https://wp.msklatam.com/wp-json/wp/api/product/${slug}`)
        .then((response) => {
          setLoading(false);
          setProduct(response.data.products[0]);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  }, []);
  return (
    <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        {isLoading ? (
          <div className="container grid gap-16 py-16">
            <LoadingText />
            <LoadingText />
            <LoadingText />
          </div>
        ) : product ? (
          <SingleProductDetail product={product} />
        ) : null}
      </section>
    </div>
  );
};

export default PageSingleProduct;
