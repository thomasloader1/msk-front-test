import { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import {
  BlogDataType,
  FetchCourseType,
  FetchPostType,
  PostDataType,
} from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import CardAuthor2 from "components/CardAuthor2/CardAuthor2";
import { compareByNameDescending } from "lib/compareByNameDescending";

export interface Card6Props {
  className?: string;
  post: FetchPostType;
  authorRow?: boolean;
  badgeColor?: string;
  kind?: string;
}

const Card6: FC<Card6Props> = ({
  className = "h-full",
  post,
  authorRow,
  kind = "blog",
  badgeColor,
}) => {
  const { title, slug, image, categories, link, author, date } = post;
  const categoriesOrder = kind === 'blog' && categories

  console.log(categories)

  return (
    <div
      className={`nc-Card6 relative flex group flex-col-reverse sm:flex-row sm:items-center p-4  [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card6"
    >
      <Link to={`/${kind}/${slug}`} className="absolute inset-0 z-0"></Link>
      <div className="flex flex-col flex-grow">
        <div className="space-y-3 mb-4">
          <CategoryBadgeList
            categories={categories}
            color={badgeColor}
            isCourse={kind === "curso"}
            isPost={kind === "blog"}
            isEbook={kind === "guia"}
          />
          <h2 className={`block font-semibold text-base`}>
            <Link
              to={`/${kind}/${slug}`}
              className="line-clamp-2"
              title={title}
            >
              {title}
            </Link>
          </h2>
          <CardAuthor2
            date={date}
            className="relative my-4"
            author={author}
            flex={authorRow}
          />
          {/* <PostCardMeta meta={{ ...post }} /> */}
        </div>
        {/* <div className="flex items-center flex-wrap justify-between mt-auto">
          <PostCardLikeAndComment className="relative" postData={post} />
          <PostCardSaveAction
            className="relative"
            postData={post}
            readingTime={readingTime}
          />
        </div> */}
      </div>

      <Link
        to={`/${kind}/${slug}`}
        className={`block relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-full sm:ml-5 rounded-2xl overflow-hidden mb-5 sm:mb-0 `}
      >
        <NcImage
          containerClassName="absolute inset-0"
          className="object-cover w-full h-full"
          src={image}
          alt={title}
        />
        {/* <span className="absolute bottom-1 left-1">
          <PostTypeFeaturedIcon
            wrapSize="h-7 w-7"
            iconSize="h-4 w-4"
            postType={postType}
          />
        </span> */}
      </Link>
    </div>
  );
};

export default Card6;
