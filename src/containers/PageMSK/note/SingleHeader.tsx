import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./SingleSidebar";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PageHead from "../PageHead";

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
  const { excerpt, title, categories } = pageData;

  return (
    <>
      <PageHead title={title} description={excerpt} />

      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5 note-header-blog">
          <CategoryBadgeList
            itemClass="!px-3"
            categories={categories}
            isPost={true}
          />
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!excerpt && !hiddenDesc && (
            <span className="block text-[12px] sm:text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1 h-[140px] sm:h-[100px]">
              {excerpt}
            </span>
          )}
          {/* 
            <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex  sm:flex-row justify-between ">
              <p className="dark:text-neutral-100 msk-logo-text">
                <img
                  className=""
                  src="/src/images/vectors/isotipo.svg"
                  width="30"
                  alt=""
                />
                MSK - Medical & Scientific Knowledge
              </p>
              <SingleMetaAction2 meta={pageData} />
            </div> 
          */}
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
