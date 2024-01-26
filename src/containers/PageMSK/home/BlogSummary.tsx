import React, { FC, useEffect, useState } from "react";
import Card2 from "components/Card2/Card2";
import { FetchPostType } from "data/types";
import Card6 from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import { useHistory } from "react-router-dom";
import { removeAccents } from "lib/removeAccents";
import { badgeColor } from "lib/badgeColor";
import NoResults from "components/NoResults/NoResults";

export interface BlogSummaryProps {
  tabs: string[];
  posts: FetchPostType[];
  heading?: string;
  className?: string;
  desc?: string;
  loading?: boolean;
  showTitle?: boolean;
}

const BlogSummary: FC<BlogSummaryProps> = ({
  posts,
  tabs,
  heading = "Blog",
  className = "",
  desc = "",
  loading = false,
  showTitle,
}) => {
  const [tabActive, setTabActive] = useState<string>(tabs[0]);

  const [auxPosts, setPosts] = useState<FetchPostType[]>([]);
  const handleClickTab = (item: string) => {
    const itemParsed = removeAccents(item);

    const filteredPosts = posts.filter((post) =>
      post.categories?.some((category: any) => category.name === itemParsed)
    );

    const finalPosts = itemParsed.includes("Actualidad")
      ? filteredPosts.slice(4, 9)
      : filteredPosts;

    setPosts(finalPosts);

    if (item === tabActive) {
      return;
    }

    setTabActive(item);
  };

  const history = useHistory();

  useEffect(() => {
    setPosts(posts.filter((_, i: number) => i < 5 && i >= 1));
    let categoryValue = decodeURIComponent(
      history.location.search.replace(/^.*\?categoria=/, "")
    );
    handleClickTab(categoryValue || "Actualidad");
  }, [posts, history.location.search]);

  return (
    <div className={`nc-BlogSummary ${className} animate-fade-down`}>
      {showTitle && (
        <h2 className={`text-3xl md:text-4xl font-medium mb-12`}>Blog</h2>
      )}
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
        desc={desc}
        viewMore="/archivo"
        mobileHidden="block"
      />
      {loading && (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 animate-fade-down">
            <ImageSkeleton className="col-span-1" />
            <div className="grid grid-cols-1 gap-5">
              <ImageSkeleton className="col-span-2 h-100" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
              <ImageSkeleton className="col-span-2" height="100px" />
            </div>
          </div>
        </>
      )}
      {!auxPosts.length && !loading && <NoResults />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {auxPosts[0] && <Card2 size="large" post={auxPosts[0]} kind="blog" />}
        <div>
          <div className="grid gap-6 md:gap-8">
            {auxPosts
              .filter((_, i) => i < 4 && i > 0)
              .map((item, index) => (
                <Card6
                  key={index}
                  post={item}
                  className="rounded-3xl"
                  kind="blog"
                  authorRow
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSummary;
