import { FC, useContext } from "react";
import NcImage from "components/NcImage/NcImage";
import { FetchCourseType } from "data/types";
import { Link } from "react-router-dom";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import { CountryContext } from "context/country/CountryContext";
import timeIcon from "../../../public/images/icons/time.svg"
import moduleIcon from "../../../public/images/icons/themesToSee.svg"

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
      className={`nc-Card8 group relative [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] overflow-hidden z-0 ${className}`}
      data-nc-id="Card8"
    >
      {/* <SocialsShare className="absolute hidden md:grid gap-[5px] right-4 top-4 opacity-0 z-[-1] group-hover:z-10 group-hover:opacity-100 transition-all duration-300" /> */}
      <Link
        to={`/curso/${slug}`}
        className="block w-full h-0 pt-[100%] sm:pt-[55%] overflow-hidden"
      >
        <NcImage
          containerClassName="absolute inset-0"
          src={imageURL}
          alt={title}
        />
        <span className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-80 group-hover:opacity-100 transition-opacity"></span>


        {/* <PostTypeFeaturedIcon
          className="absolute top-4 left-4"
          postType={postType}
          wrapSize="w-8 h-8"
          iconSize="w-4 h-4"
        /> */}
      </Link>
      <Link
        to={`/curso/${slug}`}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 flex flex-col">
        <Link to={`/curso/${slug}`} className="absolute inset-0" />
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
          <Link
            to={`/curso/${slug}`}
            className="line-clamp-3 text-2xl hover:text-white  font-raleway"
            title={title}
          >
            {title}
          </Link>
        </h2>

        {post.cantidad_modulos && (
           <div className="flex items-center mt-2">
            <img src={moduleIcon} className="size-[10px] mr-2" alt="Cantidad Modulos" /> 
            <span className="text-neutral-300 text-[14px] line-clamp-1">{post.cantidad_modulos} temas</span>
          </div>
        )}

        {post.duration && (
          <div className="flex items-center mt-2">
            <img src={timeIcon} className="size-[10px] mr-2" alt="Horas Estimadas" /> 
            <span className="text-neutral-300 text-[14px] line-clamp-1">{post.duration} horas estimadas</span>
          </div>
        )}

        

        {post.lista_de_cedentes ? (
          <div className="sm:block mt-2">
            <span className="text-neutral-300 text-[10px] line-clamp-1">Certificación</span>
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
