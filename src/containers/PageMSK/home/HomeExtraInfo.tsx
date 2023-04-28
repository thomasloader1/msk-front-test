import React, { FC } from "react";
import imgAdsDef from "images/home/illustration_1.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Link } from "react-router-dom";
export interface SectionAdsProps {
  className?: string;
  imgAds?: string;
  btnOnClick: () => void;
}

const SectionAds: FC<SectionAdsProps> = ({
  className = "",
  imgAds = imgAdsDef,
  btnOnClick,
}) => {
  return (
    <div onClick={() => btnOnClick()} className="cursor-pointer">
      <img
        src="/src/images/banners/promo-home_desktop.png"
        alt="hero"
        className="store-banner-desktop hidden md:block w-full"
      />
      <img
        src="/src/images/banners/promo-home_mobile.png"
        alt="hero"
        className="store-banner-desktop block md:hidden w-full"
      />
    </div>
  );
};

export default SectionAds;
