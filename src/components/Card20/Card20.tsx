import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { Aval, PostDataType } from "data/types";
import { Link } from "react-router-dom";
import SocialsShare from "components/SocialsShare/SocialsShare";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";

export interface Card20Props {
  className?: string;
  post: Aval;
}

const Card20: FC<Card20Props> = ({ className = "h-full", post }) => {
  let { title, description, image } = post;
  console.log({post})
  if (image) {
    image = image.replace('mx.', '');
  }

  return (
    <div
      className={`nc-Card20 group relative flex flex-col ${className}`}
      data-nc-id="Card20"
    >
      <div className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-lg overflow-hidden">
        <NcImage
          containerClassName="absolute inset-0"
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};

export default Card20;
