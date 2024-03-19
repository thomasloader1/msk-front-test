import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./SingleSidebar";
import PostMeta2 from "components/PostMeta2/PostMeta2";
import SingleMetaAction2 from "./SingleMetaAction2";
import { Helmet } from "react-helmet";

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
          {/* <CategoryBadgeList itemClass="!px-3" categories={categories} /> */}
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!desc && !hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {desc}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex items-center sm:flex-row justify-between pb-4 sm:pb-0">
            <p className="dark:text-neutral-100 msk-logo-text grid grid-cols-12 items-center gap-6">
              <div className="img-container col-span-2">
                <img
                  src="/images/vectors/isotipo.svg"
                  width="40"
                  height="40"
                  alt=""
                />
              </div>
              <p className="text-neutral-100 col-span-10 font-semibold leading-5 text-[14px] sm:text-base">
                MSK - Medical & Scientific Knowledge
              </p>
            </p>
            <SingleMetaAction2 meta={pageData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
