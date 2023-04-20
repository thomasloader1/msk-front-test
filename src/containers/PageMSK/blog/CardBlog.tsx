import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import ButtonPlayMusicRunningContainer from "containers/ButtonPlayMusicRunningContainer/ButtonPlayMusicRunningContainer";

export interface CardBlogProps {
  className?: string;
  post: PostDataType;
}

const CardBlog: FC<CardBlogProps> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, postType, date } = post;
  const IS_AUDIO = postType === "audio";

  return (
    <div
      className={`nc-CardBlog relative flex group items-center p-3 rounded-lg [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="CardBlog"
    >
      <div className="w-1/4 flex-shrink-0">
        <Link
          to={href}
          className={`block h-0 aspect-w-1 aspect-h-1 relative rounded-md overflow-hidden shadow-lg `}
        >
          <NcImage
            containerClassName="absolute inset-0"
            className="object-cover w-full h-full "
            src={featuredImage}
            alt={title}
          />
        </Link>
      </div>

      <div className="flex flex-col flex-grow ml-4">
        <h2 className={`nc-card-title block  text-lg`}>
          <Link
            to={href}
            className={IS_AUDIO ? `line-clamp-1` : "line-clamp-2"}
            title={title}
          >
            {title}
          </Link>
        </h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 ">
          {date}
        </span>
      </div>
    </div>
  );
};

export default CardBlog;
