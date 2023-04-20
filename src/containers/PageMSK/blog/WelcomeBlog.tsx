import React, { FC, useState } from "react";
import HeaderFilter from "./HeaderFilter";
import Card19 from "components/Card19/Card19";
import Card18 from "components/Card18/Card18";
import { PostDataType } from "data/types";
import { CourseDataType } from "data/MSK/courses";
import Heading from "components/Heading/Heading";

interface WelcomeBlogProps {
  tabs: string[];
  posts: any[];
  heading?: string;
  className?: string;
}
const WelcomeBlog: FC<WelcomeBlogProps> = ({
  posts,
  tabs,
  className = "",
  heading = " ",
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  // When handeClicktab please get posts from api,... and pass to new state (newPosts) and pass to
  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-WelcomeBlog ${className}`}>
      <Heading
        desc="Encuentra aquí la información y los testimonios más importantes"
        className="w-full my-8"
      >
        Te damos la bienvenida a nuestro blog
      </Heading>
      {heading && (
        <HeaderFilter
          tabActive={tabActive}
          tabs={tabs}
          heading={heading}
          onClickTab={handleClickTab}
        />
      )}
      {!posts.length && <span>Nothing we found!</span>}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {posts[0] && <Card19 className="" post={posts[0]} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-5 gap-5">
          {posts
            .map((item, index) => (
              <Card18
                showCategories={true}
                className="sm:row-span-3 col-span-1"
                key={index}
                post={item}
              />
            ))
            .filter((_, i) => i < 3 && i >= 1)}

          {posts[3] && (
            <Card19
              ratio="aspect-w-4 aspect-h-3 sm:aspect-h-1 sm:aspect-w-16 "
              className="sm:col-span-2 sm:row-span-2"
              titleClass="text-xl sm:text-2xl xl:text-2xl"
              post={posts[3]}
              showCategories={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBlog;
