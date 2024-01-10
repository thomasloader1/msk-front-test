import React, { FC } from "react";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";

export interface CardAuthor2Props
  extends Pick<PostDataType, "date" | "author"> {
  className?: string;
  readingTime?: PostDataType["readingTime"];
  hoverReadingTime?: boolean;
  flex?: boolean;
}

const CardAuthor2: FC<CardAuthor2Props> = ({
  className = "",
  author,
  readingTime,
  date,
  flex,
  hoverReadingTime = true,
}) => {
  const { name, href = "/", avatar } = author;
  return (
    <div
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={avatar}
        userName={name}
      />
      <div className={flex ? "flex gap-2" : ""}>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-bold`}
        >
          {name}
        </h2>
        <span
          className={`flex items-center text-sm text-neutral-500 dark:text-neutral-400`}
        >
          <span>{date} {(readingTime != null) && (<span className={`${readingTime <= 0 && 'hidden'}`}> — {readingTime} min lectura</span>)}</span>
          

          {/* {readingTime && (
            <>
              <span
                className={` lg:inline mx-1 transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                ·
              </span>
              <span
                className={` lg:inline transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                - {readingTime} min
              </span>
            </>
          )} */}
        </span>
      </div>
    </div>
  );
};

export default CardAuthor2;
