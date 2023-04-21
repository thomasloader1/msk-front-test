import React, { FC } from "react";
import course1 from "../../images/eduman/course-01.jpg";
import { Link } from "react-router-dom";
import fai from "../../styles/fai/fontAwesome5Pro.module.css";
import { CourseDataType } from "data/types";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";

interface Props {
  product: CourseDataType;
  className?: string;
  hoverEffect?: boolean;
}

const StoreProduct: FC<Props> = ({
  product,
  className,
  hoverEffect = false,
}): any => {
  return (
    <div className={`protfolio-course-2-wrapper  ${className}`}>
      <div className="student-course-img">
        <Link to="/course-details">
          <img src={product.featuredImage} alt="course-img" />
        </Link>
      </div>
      {hoverEffect ? (
        <div className="course-cart">
          <div className="course-info-wrapper">
            <div className="cart-info-body">
              <CategoryBadgeList
                categories={product.categories}
                color="yellow"
              />
              <Link to="/course-details">
                <h3>{product.title}</h3>
              </Link>
              <div className="cart-lavel">
                <h5>
                  Nivel: <span>{product.level}</span>
                </h5>
                <p>{product.desc}</p>
              </div>
              <div className="info-cart-text">
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
              </div>
              <div className="course-action">
                <Link to="/course-details" className="view-details-btn">
                  Ver más
                </Link>
                <button className="wishlist-btn">
                  <i className="flaticon-like"></i>
                </button>
                <Link to="/course-details" className="c-share-btn">
                  <i className="flaticon-previous"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div className="portfolio-course-2-content">
        <div className="portfolio-course-wrapper">
          <CategoryBadgeList categories={product.categories} color="yellow" />

          {/* <div className="portfolio-price">
            <span>${product.discount_price}</span>
            <del>${product.price}</del>
          </div> */}
          <div className="portfolio-course-2">
            <h3>
              <Link to="/course-details">{product.title}</Link>
            </h3>
          </div>
          <p className="text-sm">{product.desc}</p>
        </div>
      </div>
      <div className="course-2-footer">
        <div className="coursee-clock">
          <i className="flaticon-clock"></i>
          <span>{product.length}</span>
        </div>

        <div className="course-network text-primary">
          <span>Descubrir</span>
        </div>
      </div>
    </div>
  );
};

export default StoreProduct;
