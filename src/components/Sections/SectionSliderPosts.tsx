"use client";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Heading from "@/components/Heading/Heading";
import Card4 from "@/components/Card4/Card4";
import Card7 from "@/components/Card7/Card7";
import { FetchCourseType, FetchPostType, PostDataType } from "@/data/types";
import Card9 from "@/components/Card9/Card9";
import Card10 from "@/components/Card10/Card10";
import Card11 from "@/components/Card11/Card11";
import Card10V2 from "@/components/Card10/Card10V2";
import MySlider from "@/components/MySlider";
import Card20 from "../Card20/Card20";
import { DataContext } from "@/context/data/DataContext";

export interface SectionSliderPostsProps {
  className?: string;
  heading?: string;
  subHeading?: string;
  posts?: any;
  postCardName?:
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card20";
  perView?: 2 | 3 | 4;
  sliderStype?: "style1" | "style2";
  uniqueSliderClass: string;
  loading?: boolean;
  showPosts?: string;
  forSingleNote?: boolean;
  maxWidth?: string;
}

const SectionSliderPosts: FC<SectionSliderPostsProps> = ({
  heading,
  subHeading,
  className = "",
  posts,
  postCardName = "card4",
  perView = 4,
  forSingleNote = false,
  maxWidth,
}) => {
  let CardComponent = Card4;

  switch (postCardName) {
    case "card4":
      CardComponent = Card4;
      break;
    case "card7":
      CardComponent = Card7;
      break;
    case "card9":
      CardComponent = Card9;
      break;
    case "card10":
      CardComponent = Card10;
      break;
    case "card10V2":
      CardComponent = Card10V2;
      break;
    case "card11":
      CardComponent = Card11;
      break;
    case "card20":
      CardComponent = Card20;
      break;
    default:
      break;
  }

  return (
    <div className={`nc-SectionSliderPosts ${className}`}>
      <Heading desc={subHeading} isCenter>
        {heading}
      </Heading>

      <MySlider
        data={posts}
        maxWidth={maxWidth}
        renderItem={(item, indx) => (
          <CardComponent
            key={indx}
            post={item}
            showDescription={true}
            kind="curso"
            forSingleNote={forSingleNote}
          />
        )}
        itemPerRow={posts?.length > 4 ? perView : posts?.length}
        //loading={showPosts ? loadingBestSellers : loading}
      />
    </div>
  );
};

export default SectionSliderPosts;
