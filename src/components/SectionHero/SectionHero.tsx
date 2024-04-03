import ButtonPrimary from "components/Button/ButtonPrimary";
import React, { FC, ReactNode } from "react";
import { parseHtml } from "utils/parseHTML";

export interface SectionHeroProps {
  className?: string;
  rightImg: string;
  heading: string;
  subHeading?: string;
  btnText: string;
  btnOnClick: () => void;
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
    <div
      className={`nc-SectionHero relative ${className}`}
      data-nc-id="SectionHero"
    >
      <div className="flex flex-col lg:flex-row space-y-14 lg:space-y-0 lg:space-x-10 items-center relative text-center lg:text-left">
        <div className="w-screen max-w-full space-y-5 lg:space-y-7 flex-1">
          <h1 className="!leading-tight text-neutral-900 section-hero-title dark:text-neutral-100 font-medium sm:font-bold text-[24px] sm:text-[42px]" dangerouslySetInnerHTML={{ __html: parseHtml(heading, true)}}
          />
          {subHeading ? (
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              {subHeading}
            </span>
          ) : null}
          {!!btnText && (
            <ButtonPrimary
              onClick={() => btnOnClick()}
              rounded="rounded-lg"
              className="font-semibold text-[16px]"
            >
              {btnText}
            </ButtonPrimary>
          )}
        </div>
        <div className="hero-img">
          <img className="w-full" src={rightImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
