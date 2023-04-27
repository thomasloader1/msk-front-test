import { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import { FetchPostType } from "data/types";

export interface Card18Props {
  className?: string;
  ratio?: string;
  titleClass?: string;
  post: FetchPostType;
  hoverClass?: string;
  showCategories?: boolean;
}

const Card18: FC<Card18Props> = ({
  className = "h-full",
  titleClass = "text-lg ",
  ratio = "aspect-w-4 sm:aspect-w-3 aspect-h-3",
  post,
  hoverClass = "",
  showCategories = true,
}) => {
  const { title, link, image, categories } = post;

  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <h2 className={`block font-semibold text-white ${titleClass}`}>
          {title}
        </h2>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card18 relative flex flex-col group rounded-xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card18"
    >
      {/* <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
        <PostCardLikeAndComment className="relative" postData={post} />
        <PostCardSaveAction className="relative" postData={post} />
      </div> */}
      <div className={`flex items-start relative w-full ${ratio}`}></div>(
      <Link to={link}>
        <NcImage
          containerClassName="absolute inset-0 rounded-xl"
          className="object-cover w-full h-full rounded-xl"
          src={image}
        />
        {/* <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType={postType}
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          /> */}
        <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </Link>
      )
      <Link
        to={link}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-80"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-6 flex flex-col flex-grow">
        <Link to={link} className="absolute inset-0"></Link>
        {showCategories && (
          <div className="mb-3">
            <CategoryBadgeList categories={categories} />
          </div>
        )}
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card18;
