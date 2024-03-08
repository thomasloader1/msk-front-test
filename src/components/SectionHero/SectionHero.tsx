"use client";
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import NcImage from "../NcImage/NcImage";

export interface SectionHeroProps {
  className?: string;
  rightImg: string | StaticImageData;
  heading: ReactNode;
  subHeading?: string;
  btnText: string;
  btnOnClick?: () => void;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  rightImg,
  heading,
  subHeading,
  btnText,
  btnOnClick,
}) => {
  return (
    <div className={`nc-SectionHero relative ${className}`}>
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 rtl:space-x-reverse items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h2 className="!leading-tight text-neutral-900 section-hero-title dark:text-neutral-100 font-medium sm:font-bold text-[24px] sm:text-[42px]">
            {heading}
          </h2>
          {subHeading ? (
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              {subHeading}
            </span>
          ) : null}
          {!!btnText && (
            <ButtonPrimary onClick={btnOnClick} className="rounded-lg">
              {btnText}
            </ButtonPrimary>
          )}
        </div>
        <div className="flex-grow">
          <NcImage
            className="w-full"
            src={rightImg}
            alt=""
            width="1200"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
