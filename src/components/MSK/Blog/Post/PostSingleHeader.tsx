import React, { FC } from "react";
import SingleTitle from "./SingleTitle";
import { SinglePageType } from "./SingleSidebar";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PageHead from "../../../Head/PageHeadServer";

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
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-3 note-header-blog">
          <CategoryBadgeList
            itemClass="!px-3 text-[14px]"
            categories={categories}
            isPost={true}
          />
          <SingleTitle mainClass={titleMainClass} title={title} />
          {!!excerpt && !hiddenDesc && (
            <span className="block text-[16px] sm:text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1 h-[180px] sm:h-[120px] leading-5">
              {excerpt}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default SingleHeader;
