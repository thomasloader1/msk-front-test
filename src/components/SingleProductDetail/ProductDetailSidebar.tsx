import { Link } from "react-router-dom";
import React, { FC, useState } from "react";
import { Details, FetchCourseType, Ficha } from "data/types";

interface Props {
  ficha: Ficha;
  details: Details;
}

const ProductDetailSidebar: FC<Props> = ({ ficha, details }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openVideoModal = () => setIsOpen(!isOpen);

  const courseData = [
    {
      title: "Modalidad",
      property: "modality",
      icon: "/src/images/icons/pc.svg",
    },
    {
      title: "Curso disponible",
      property: "available",
      icon: "/src/images/icons/clock.svg",
    },
    {
      title: "Asesoramiento académico",
      property: "counseling",
      icon: "/src/images/icons/bubble.svg",
    },
    {
      title: "Certificación",
      property: "diploma",
      icon: "/src/images/icons/prize.svg",
    },
    {
      title: "Idioma",
      property: "language_name",
      icon: "/src/images/icons/lang.svg",
    },
  ];
  return (
    <div className="course-video-widget">
      <div className="course-widget-wrapper mb-30">
        <div className="course-video-thumb w-img hidden lg:flex">
          <img src={ficha.image} alt="img not found" />
        </div>
        <div className="course-video-price">
          <span>💳 Pagos sin intereses</span>
        </div>
        <div className="course-video-body">
          <ul>
            {Object.keys(details).map((key, index) => {
              return (
                <li key={`data_${index}`}>
                  <div className="course-vide-icon">
                    <img
                      src={details[key as keyof typeof details].icon}
                      width="15"
                    />
                    <span>
                      {details[key as keyof typeof details].value}{" "}
                      {key == "duration" ? "horas" : ""}
                    </span>
                  </div>
                  <div className="video-corse-info"></div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-2">
          <a href="#contactanos" className="video-cart-btn w-full">
            Contactáctanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSidebar;
