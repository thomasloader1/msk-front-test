import React, { FC, useEffect, useState } from "react";
import featuredTextImg from "../../images/featuredTextImg.png";

interface ProductFeaturedTextProps {
  text: string;
}

const ProductFeaturedText: FC<ProductFeaturedTextProps> = ({ text }) => {
  const [formattedText, setFormattedText] = useState("");
  useEffect(() => {
    setFormattedText(text.replace(/<em>/g, "").replace(/<\/em>/g, ""));
  }, [text]);
  return (
    <div className="requirements mb-10 sm:mb-16 flex-column flex-nowrap items-center">
      <img
        src={featuredTextImg}
        alt="featuredTextImg"
        className="mr-5 hidden sm:block"
      />
      <div
        dangerouslySetInnerHTML={{ __html: formattedText }}
        className="font-normal not-italic"
      />
    </div>
  );
};

export default ProductFeaturedText;
