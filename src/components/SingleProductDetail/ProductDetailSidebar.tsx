import { FC, useEffect, useState } from "react";
import { Details, Ficha } from "data/types";

interface Props {
  ficha: Ficha;
  details: Details;
}

const ProductDetailSidebar: FC<Props> = ({ ficha, details }) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);
  let scrollPosition = 0;

  const calculateDistanceToBottom = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    return documentHeight - (scrollPosition + windowHeight);
  };

  useEffect(() => {
    const handleScroll = () => {
      const threshold = 450;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsFixed(scrollTop > threshold);

      const distanceToBottom = calculateDistanceToBottom();
      const auxDistance = scrollPosition - distanceToBottom - 100;
      setBottomDistance(distanceToBottom < 1065 ? auxDistance / 2 : 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let translations: { [key: string]: string } = {
    duration: "Duración",
    modality: "Modalidad",
    flexibility: "Flexibilidad",
    content: "Contenido",
  };

  return (
    <div className={`course-video-widget`}>
      <div
        className={`${
          isFixed && bottomDistance == 0
            ? "course-widget-wrapper-fixed"
            : "course-widget-wrapper "
        } ${bottomDistance != 0 ? "absolute bottom-0" : ""}`}
      >
        {isFixed ? null : (
          <div className="course-video-thumb w-img hidden lg:flex">
            <img src={ficha.image.replace("mx.", "")} alt="img not found" />
          </div>
        )}

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
                      {translations[key] ? translations[key] + ":" : ""}{" "}
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
          <button
            onClick={scrollToContactForm}
            className="video-cart-btn w-full"
          >
            Contactáctanos
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSidebar;
const scrollToContactForm = () => {
  const contactForm = document.getElementById("contactanos");
  if (contactForm) {
    window.scrollTo({
      top: document.getElementById("contactanos")!.offsetTop,
      behavior: "smooth",
    });
  }
};
