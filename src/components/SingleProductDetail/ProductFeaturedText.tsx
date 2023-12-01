import React, { FC } from "react";
import featuredTextImg from "../../images/featuredTextImg.png";

interface ProductFeaturedTextProps {
  text: string;
}

const ProductFeaturedText: FC<ProductFeaturedTextProps> = ({ text }) => {
  return (
    <div className="requirements mb-10 sm:mb-16 flex-column flex-nowrap items-center">
      <img
        src={featuredTextImg}
        alt="featuredTextImg"
        className="mr-5 hidden sm:block"
      />
      <div dangerouslySetInnerHTML={{ __html: text }} className="font-normal" />
    </div>
  );
};

export default ProductFeaturedText;
