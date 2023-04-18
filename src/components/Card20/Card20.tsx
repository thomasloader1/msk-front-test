import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import SocialsShare from "components/SocialsShare/SocialsShare";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface Card20Props {
  className?: string;
  post: PostDataType;
}

const Card20: FC<Card20Props> = ({ className = "h-full", post }) => {
  const { title, href, featuredImage, desc, postType } = post;

  return (
    <div
      className={`nc-Card20 group relative flex flex-col ${className}`}
      data-nc-id="Card20"
    >
      <Link
        to={href}
        className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-lg overflow-hidden"
      >
        <NcImage
          containerClassName="absolute inset-0"
          src={featuredImage}
          alt={title}
        />
      </Link>
    </div>
  );
};

export default Card20;
