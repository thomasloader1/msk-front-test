import React, { FC } from "react";
import featuredTextImg from "../../images/featuredTextImg.png";

interface ProductFeaturedTextProps {
  text: string;
}

const ProductFeaturedText: FC<ProductFeaturedTextProps> = ({ text }) => {
  return (
    <div className="requirements mb-16 flex-column flex-nowrap items-center">
      <img src={featuredTextImg} alt="featuredTextImg" className="mr-5" />
      <div dangerouslySetInnerHTML={{ __html: text }} className="font-normal" />
    </div>
  );
};

export default ProductFeaturedText;
