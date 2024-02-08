import React, { FC } from "react";
import { SinglePageType } from "../PageMission";
import SingleTitle from "../mission/SingleTitle";
import SingleMetaAction2 from "../mission/SingleMetaAction2";

export interface SingleHeaderProps {
  pageData: SinglePageType;
  hiddenDesc?: boolean;
  metaActionStyle?: "style1" | "style2";
  titleMainClass?: string;
  className?: string;
}

const SingleHeader: FC<SingleHeaderProps> = ({
  pageData,
  titleMainClass,
  hiddenDesc = false,
  className = "",
  metaActionStyle = "style1",
}) => {
  const { categories, desc, title } = pageData;

  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!desc && !hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {desc}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex  sm:flex-row justify-between ">
            <p className="dark:text-neutral-100 msk-logo-text">
              <img
                className=""
                src="/images/vectors/isotipo.svg"
                width="30"
                alt=""
              />
              MSK - Medical & Scientific Knowledge
            </p>
            <SingleMetaAction2 meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
