import SingleProductDetail from "components/SingleProductDetail/SingleProductDetail";
import React, { useContext, useEffect, useState } from "react";
import { HOME_COURSES } from "data/MSK/courses";
import { FetchSingleProduct } from "data/types";
import axios from "axios";
import LoadingText from "components/Loader/Text";
import { API_URL } from "data/api";
import { CountryContext } from "context/country/CountryContext";

const PageSingleProduct = () => {
  const { state } = useContext(CountryContext);

  const slug = window.location.href.split("/").pop();
  const [product, setProduct] = useState<FetchSingleProduct>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      axios
        .get(`${API_URL}/product/${slug}?country=${state.country}`)
        .then((response) => {
          setLoading(false);
          setProduct(response.data);
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
