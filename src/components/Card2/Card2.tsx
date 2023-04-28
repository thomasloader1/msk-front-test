import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import {
  BlogDataType,
  FetchCourseType,
  FetchPostType,
  PostDataType,
} from "data/types";
import { Link } from "react-router-dom";
import SocialsShare from "components/SocialsShare/SocialsShare";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostCardLikeAction from "components/PostCardLikeAction/PostCardLikeAction";

export interface Card2Props {
  className?: string;
  post: FetchPostType | FetchCourseType;
  size?: "normal" | "large";
  hideDesc?: boolean;
  hideAuthor?: boolean;
  badgeColor?: string;
}

const Card2: FC<Card2Props> = ({
  className = "h-full",
  size = "normal",
  post,
  badgeColor,
  hideDesc,
  hideAuthor,
}) => {
  const { title, image, categories } = post;

  const url = "";

  return (
    <div
      className={`nc-Card2 group relative flex flex-col  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden ${className} rounded-lg`}
      data-nc-id="Card2"
    >
      <span className="block flex-shrink-0 flex-grow relative w-full h-0 pt-[75%] sm:pt-[55%] rounded-lg overflow-hidden">
        {/* <PostTypeFeaturedIcon
          className="absolute bottom-2 left-2"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        /> */}
      </span>

      <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" />
      <Link to={url} className="absolute inset-0" />

      <div className="p-4 sm:p-5 flex flex-col">
        <div className="space-y-3">
          <CategoryBadgeList
            itemClass="relative"
            categories={categories}
            color={badgeColor}
          />
          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors h-12 ${
              size === "large" ? "text-lg sm:text-2xl" : "text-base"
            }`}
          >
            <Link to={url} className="line-clamp-2" title={title}>
              {title}
            </Link>
          </h2>
          {/* {hideDesc ? null : (
            <span className="block text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
              {desc}
            </span>
          )} */}
        </div>
        {/* {hideAuthor ? null : (
          <CardAuthor2 className="relative my-4" date={date} author={author} />
        )} */}
        {/* <div className="flex items-center justify-between mt-auto">
          <PostCardLikeAction
            className="relative pl-3 py-1 pr-4 mt-3"
            postId={""}
            likeCount={1200}
            isLiked={true}
          />
          <PostCardSaveAction
            className="relative"
            postData={post}
            readingTime={readingTime}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Card2;
