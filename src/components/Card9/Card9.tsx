import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import { CourseDataType } from "data/types";

export interface Card9Props {
  className?: string;
  ratio?: string;
  post: any;
  hoverClass?: string;
  showDescription?: boolean;
  badgeColor?: string;
}

const Card9: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",
  post,
  hoverClass = "",
  showDescription = false,
  badgeColor = "yellow",
}) => {
  const {
    title,
    href,
    featuredImage,
    categories,
    author,
    date,
    postType,
    desc,
  } = post;

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h2 className="block text-lg font-semibold text-white ">
            <span className="text-xl" title={title}>
              {title}
            </span>
          </h2>
          {author && author.href ? (
            <Link to={author.href} className="flex mt-2.5 relative">
              <span className="block text-neutral-200 hover:text-white font-medium truncate">
                {author.displayName}
              </span>
              <span className="mx-[6px] font-medium">·</span>
              <span className="font-normal truncate">{date}</span>
            </Link>
          ) : (
            <>
              {showDescription ? (
                <div className="hidden sm:block mt-2">
                  <span className="text-neutral-300 text-sm line-clamp-1">
                    {desc}
                  </span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden z-0 ${hoverClass} ${className}`}
      data-nc-id="Card9"
    >
      {/* <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment className="relative" postData={post} />
        <PostCardSaveAction className="relative" postData={post} />
      </div> */}
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      <Link to={href}>
        <NcImage
          containerClassName="absolute inset-0 rounded-3xl"
          className="object-cover w-full h-full rounded-3xl"
          src={featuredImage}
        />
        <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Link>
      <Link
        to={href}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link to={href} className="absolute inset-0"></Link>
        <div className="mb-3">
          <CategoryBadgeList categories={categories} color={badgeColor} />
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9;
