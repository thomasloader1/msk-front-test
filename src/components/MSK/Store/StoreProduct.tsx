import { FC, useContext } from "react";
import { FetchCourseType } from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import Badge from "@/components/Badge/Badge";
import { CountryContext } from "@/context/country/CountryContext";
import NcLink from "@/components/NcLink/NcLink";
import Image from "next/image";
import clockIcon from '/public/images/icons/clock.svg'
import {removeFirstSubdomain} from "@/utils/removeFirstSubdomain";

interface Props {
  product: FetchCourseType;
  className?: string;
  hoverEffect?: boolean;
  kind: string;
}

const StoreProduct: FC<Props> = ({
  product,
  className,
  hoverEffect = false,
  kind,
}) => {

  const imageURL = removeFirstSubdomain(product.thumbnail.high);

  return (
    <div className={`protfolio-course-2-wrapper ${className}`}>
      <div className="student-course-img">
        <NcLink href={`/curso/${product.slug}`}>
          <Image src={imageURL} className="transition-all" width={1000} height={1000} alt={`${product.title}`} />
        </NcLink>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={kind === "course"}
                isEbook={kind === "downloadable"}
              />
              <NcLink href={`/curso/${product.slug}`}>
                <h3 className="">{product.title}</h3>
              </NcLink>
              {/* <div className="cart-lavel">
                <h5>
                  Nivel: <span>{product.level}</span>
                </h5>
                <p>{product.desc}</p>
              </div> */}
              {/* <div className="info-cart-text">
                <ul>
                  {product.list?.map((item: any, index) => {
                    return (
                      <li key={index}>
                        <i className="far fa-check"></i>
                        {item.title}
                      </li>
                    );
                  })}
                </ul>
              </div> */}
              <div className="course-action">
                <NcLink
                  href={`/curso/${product.slug}`}
                  className="view-details-btn"
                >
                  Ver más
                </NcLink>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <NcLink href={`/curso/${product.slug}`} className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </NcLink>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <div className="flex flex-wrap gap-1">
            {product.duration ? null : (
              <>
                <Badge
                  icon="elearning"
                  color="emerald-post"
                  name="Guía profesional"
                  href={`/tienda?recurso=guias-profesionales`}
                  textSize="text-xs sm:text-xs"
                />
              </>
            )}
            <CategoryBadgeList
              categories={product.categories}
              color="yellow"
              isCourse={true}
              textSize="text-xs sm:text-xs"
            />
          </div>
          
          <div className="portfolio-course-2 line-clamp-3">
            <NcLink href={`/curso/${product.slug}`}>
              <h3 className="font-bold text-sm">{product.title}</h3>
            </NcLink>
          </div>

          {product.lista_de_cedentes ? (
            <p className="text-sm">{product.lista_de_cedentes[0].post_title}</p>
          ) : null}
        </div>
      </div>

      <div className="course-2-footer">
        {product.duration ? (
          <div className="coursee-clock">
            <Image {...clockIcon} className="mr-2"/>
            <span>{product.duration} horas</span>
          </div>
        ) : (
          <div></div>
        )}

        <NcLink
          href={`/curso/${product.slug}`}
          className="course-network text-primary font-bold"
        >
          Descubrir
        </NcLink>
      </div>
    </div>
  );
};

export default StoreProduct;
