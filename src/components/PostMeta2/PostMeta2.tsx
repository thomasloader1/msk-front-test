import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { FetchPostType, PostDataType } from "data/types";
import { Link } from "react-router-dom";

export interface PostMeta2Props {
  className?: string;
  meta: any;
  hiddenCategories?: boolean;
  size?: "large" | "normal";
  avatarRounded?: string;
  hideDate?: boolean;
}

const PostMeta2: FC<PostMeta2Props> = ({
  className = "leading-none",
  meta,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
  hideDate = false,
}) => {
  const { date, author, categories } = meta;
  return (
    <div
      className={`nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
      data-nc-id="PostMeta2"
    >
      <div className="flex items-center space-x-2">
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={author.avatar}
          userName={author.name}
        />
      </div>
      <div className="ml-3">
        <div className="flex items-center">
          <div className="block font-semibold">{author.name}</div>

          {/* {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ml-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link key={cat.id} to={cat.href} className="font-semibold">
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )} */}
        </div>
        {hideDate ? null : (
          <div className="text-xs mt-[6px]">
            <span className="text-neutral-700 dark:text-neutral-300">
              {date}
            </span>
            {/* <span className="mx-2 font-semibold">·</span>
            <span className="text-neutral-700 dark:text-neutral-300">
              {readingTime} min read
            </span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostMeta2;
