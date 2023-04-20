import Card15Podcast from "components/Card15Podcast/Card15Podcast";
import Card9 from "components/Card9/Card9";
import Heading from "components/Heading/Heading";
import { DEMO_POSTS_AUDIO } from "data/posts";
import { PostDataType } from "data/types";
import React, { FC } from "react";
import CardBlog from "./CardBlog";

const postsDemo: PostDataType[] = DEMO_POSTS_AUDIO.filter(
  (_, i) => i > 0 && i < 10
);

export interface TendenciesProps {
  posts?: PostDataType[];
  className?: string;
  gapClassName?: string;
  heading?: string;
}

const Tendencies: FC<TendenciesProps> = ({
  posts = postsDemo,
  className = "",
  gapClassName = "gap-6 md:gap-8",
  heading = " Tendencies",
}) => {
  return (
    <div className={`nc-Tendencies relative ${className}`}>
      {heading && (
        <Heading
          desc={
            "Lee las últimas novedades del ámbito médico, científico y académico"
          }
        >
          {heading}
        </Heading>
      )}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName}`}
      >
        {posts[0] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[0]} />}
        {posts[1] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[1]} />}
        {posts[2] && <Card9 ratio="aspect-w-4 aspect-h-3 " post={posts[2]} />}
      </div>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName} mt-8`}
      >
        {posts
          .filter((_, i) => i > 2)
          .map((p) => (
            <CardBlog key={p.id} post={p} />
          ))}
      </div>
    </div>
  );
};

export default Tendencies;
