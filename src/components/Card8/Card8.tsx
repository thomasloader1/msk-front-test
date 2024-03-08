import React, { FC, useContext } from "react";
import { FetchCourseType, PostDataType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import Image from "next/image";
import Link from "next/link";
import { CountryContext } from "@/context/country/CountryContext";
import NcLink from "../NcLink/NcLink";
import NcImage from "../NcImage/NcImage";

export interface Card8Props {
  className?: string;
  post: FetchCourseType;
  badgeColor?: string;
  kind: "curso" | "guia" | "blog";
}

const Card8: FC<Card8Props> = ({
  className = "h-full",
  post,
  badgeColor = "yellow",
  kind,
}) => {
  const { title, categories, id, slug, image } = post;
  const { state } = useContext(CountryContext);
  const imageURL = image.replace(`${state.country || "mx"}.`, "");

  return (
    <div
      className={`nc-Card8 group relative [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden z-0 ${className} rounded-none`}
      data-nc-id="Card8"
    >
      <NcLink
        href={`/curso/${slug}`}
        className="block w-full h-0 pt-[100%] sm:pt-[55%] overflow-hidden"
      >
        <NcImage
          containerClassName="absolute inset-0"
          src={imageURL}
          alt={title}
          width="100"
          height="100"
        />
        <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      </NcLink>
      <NcLink
        href={`/curso/${slug}`}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></NcLink>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        <NcLink href={`/curso/${slug}`} className="absolute inset-0" />
        <CategoryBadgeList
          color={badgeColor}
          categories={categories}
          isCourse={kind === "curso"}
          isPost={kind === "blog"}
          isEbook={kind === "guia"}
        />
        <h2
          className={`mt-3 relative block font-semibold text-neutral-50 text-lg sm:text-2xl `}
        >
          <NcLink
            href={`/curso/${slug}`}
            className="line-clamp-3 text-2xl font-raleway font-bold"
            colorClass="text-white hover:text-white"
          >
            {title}
          </NcLink>
        </h2>
        {post.lista_de_cedentes ? (
          <div className="sm:block mt-2">
            <span className="text-neutral-300 text-sm line-clamp-1">
              {post.lista_de_cedentes[0].post_title}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Card8;
