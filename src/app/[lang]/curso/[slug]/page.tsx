import SingleProductDetail from "@/components/SingleProductDetail/SingleProductDetail";
import React, { FC } from "react";
import ssr from "@Services/ssr";

interface PageCourseProps {
  params: any;
}
export const runtime = 'edge';

const PageSingleProduct: FC<PageCourseProps> = async ({ params }) => {
    const { product } = await ssr.getSingleProduct(params.slug, params.lang);

      return (
        <div className={`nc-PageSubcription `} data-nc-id="PageSubcription">
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
