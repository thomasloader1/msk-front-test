import SingleProductDetail from "@/components/SingleProductDetail/SingleProductDetail";
import React, { FC } from "react";
import ssr from "@Services/ssr";
import PageHeadServer from "@/components/Head/PageHeadServer";

interface PageCourseProps {
  params: any;
}
export const runtime = "edge";

const PageSingleProduct: FC<PageCourseProps> = async ({ params }) => {
  const { product } = await ssr.getSingleProduct(params.slug, params.lang);
  return (
    <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
      <PageHeadServer
        title={product?.ficha.title as string}
        description={product?.ficha.description}
        schemaJson="Course"
        schemaJsonData={product}
      />
      <section className="text-neutral-600 text-sm md:text-base overflow-hidden">
        {product ? (
          <SingleProductDetail product={product} country={params.country} />
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default PageSingleProduct;
