import React, { FC } from "react";
import StorePagination from "./StorePagination";
import StoreSideBar from "./StoreSideBar";
import StoreProduct from "./StoreProduct";
import { CourseDataType } from "data/types";

interface Props {
  products: CourseDataType[];
}

const StoreContent: FC<Props> = ({ products }) => {
  return (
    <section className="container course-content-area pb-90">
      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[20%_80%] gap-4 mb-10">
        <div className="flex flex-col">
          <StoreSideBar />
        </div>

        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, index) => {
              return (
                <StoreProduct
                  product={product}
                  key={`${product.id}_${index}`}
                />
              );
            })}
          </div>

          <div className="grid grid-cols-1">
            <StorePagination />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreContent;
