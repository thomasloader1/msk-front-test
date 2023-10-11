import { FC, useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { User, UserCourseProgress } from "data/types";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import Badge from "components/Badge/Badge";
import activeIcon from "../../../images/icons/activo.svg";
import inactiveIcon from "../../../images/icons/inactivo.svg";
import expiredIcon from "../../../images/icons/expirado.svg";
import {
  goToLMS,
  productFinishOrActive,
  productStatusIsExpired,
  statusCourse,
} from "logic/account";
import CentroAyudaLink from "components/CentroAyudaLink/CentroAyudaLink";
import { CountryContext } from "context/country/CountryContext";
import calendarIcon from "../../../images/icons/calendar.svg";
import { formatDate } from "lib/formatDate";

interface Props {
  product: UserCourseProgress;
  user: User;
  className?: string;
  hoverEffect?: boolean;
  isAccount?: boolean;
}

const ProductAccount: FC<Props> = ({
  product,
  user,
  className,
  hoverEffect = false,
}) => {
  const statusProduct = statusCourse(product.status)

  const activeProductRef = useRef(product.status !== 'Inactivo' && product.status !== 'Expirado');
  const productExpiration = useRef(new Date(product.expiration));
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const { state } = useContext(CountryContext);

  const imageURL = product.thumbnail.high.replace(
    `${"mx" || state.country}.`,
    ""
  );

  const handleClick = async () => {
    if (activeProductRef.current) {
      setOnRequest(true);

      try {
        await goToLMS(
          product.product_code,
          product.product_code_cedente,
          user.email
        );
      } catch (e: any) {
        console.log(e);
      } finally {
        setOnRequest(false);
      }
    }
  };


  return (
    <div className={`protfolio-course-2-wrapper ${className}`}>
      <div className="student-course-img">
        <a onClick={handleClick}>
          <img src={imageURL} alt="course-img" />
        </a>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
                isCourse={true}
              />
              <a onClick={handleClick}>
                <h3>{product.title}</h3>
              </a>

              <div className="course-action">
                <a onClick={handleClick} className="view-details-btn">
                  Ver más
                </a>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <a onClick={handleClick} className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <div className="flex gap-2">
            {product.duration ? null : (
              <>
                <Badge
                  icon="elearning"
                  color="emerald-post"
                  name="Guía profesional"
                  textSize="text-xs"
                />
              </>
            )}
            <CategoryBadgeList
              categories={product.categories}
              color="yellow"
              isCourse={true}
            />
          </div>

          <div className="portfolio-course-2 line-clamp-3">
            <a onClick={handleClick} className="">
              <h3 className="font-bold text-sm">{product.title}</h3>
            </a>
          </div>
          {/* {product?.lista_de_cedentes && (
            <p className="text-sm">
              {product?.lista_de_cedentes[0].post_title}
            </p>
          )} */}
          <div className="flex items-center mt-2 ">
            <img src={calendarIcon} alt="Calendar Icon" className="mr-2" />
            <span className="text-violet-wash text-sm">
              Fecha de expiración: {formatDate(productExpiration.current)}
            </span>
          </div>
          {statusProduct && (
            <CentroAyudaLink addClassNames="my-2" />
          )}
        </div>
      </div>
      <div className="course-2-footer text-grey-course">
        {productFinishOrActive(product.status) ? (
          <div className="coursee-clock">
            <img src={activeIcon} alt={product.status} />
            <span className="ml-2">{product.status}</span>
          </div>
        ) : productStatusIsExpired(product.status) ? (
          <div className="coursee-clock">
            <img src={inactiveIcon} alt={product.status} />
            <span className="ml-2">{product.status}</span>
          </div>
        ) : (
          <div className="coursee-clock">
            <img src={expiredIcon} alt={product.status} />
            <span className="ml-2">{product.status}</span>
          </div>
        )}

        <button
          className="course-network text-primary font-bold disabled:cursor-not-allowed disabled:opacity-70"
          onClick={handleClick}
          disabled={statusProduct || onRequest}
        >
          {onRequest ? "Ingresando ..." : "Ir al curso"}
        </button>
      </div>
    </div>
  );
};

export default ProductAccount;
