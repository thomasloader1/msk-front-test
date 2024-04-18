'use client'
import ButtonPrimary from "@/components/Button/ButtonPrimary";
import { StaticImageData } from "next/image";
import React, { FC } from "react";
import NcImage from "../NcImage/NcImage";
import { removeFirstTag } from "@/lib/removeFirstTag";
import { useRouter } from "next/navigation";

export interface SectionHeroProps {
  className?: string;
  redirectUrl?: string;
  rightImg: string | StaticImageData;
  heading: string;
  subHeading?: string;
  btnText: string;
  btnOnClick?: () => void;
}

const SectionHero: FC<SectionHeroProps> = ({
  className = "",
  redirectUrl = "",
  rightImg,
  heading,
  subHeading,
  btnText,
  btnOnClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    
    if(redirectUrl.length > 1){
      router.push(redirectUrl)
    }

    typeof btnOnClick === 'function' && btnOnClick()
  }

  return (
    <div className={`nc-SectionHero relative ${className}`}>
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 rtl:space-x-reverse items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full xl:max-w-lg space-y-5 lg:space-y-7">
          <h2 className="!leading-tight text-neutral-900 section-hero-title dark:text-neutral-100 font-bold text-[24px] md:text-[35px] sm:text-[42px]" dangerouslySetInnerHTML={{__html: removeFirstTag(heading)}}/>
           
          {subHeading ? (
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              {subHeading}
            </span>
          ) : null}
          {!!btnText && (
            <ButtonPrimary onClick={handleClick} className="rounded-lg">
              {btnText}
            </ButtonPrimary>
          )}
        </div>
        <div className="flex-grow">
          <NcImage
            className="w-full"
            src={rightImg}
            alt="arrow next"
            width="1200"
            height="400"
          />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
