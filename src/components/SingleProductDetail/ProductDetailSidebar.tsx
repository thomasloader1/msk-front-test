import { FC, useContext, useEffect, useState } from "react";
import { Details, Ficha } from "data/types";
import { CountryContext } from "context/country/CountryContext";

interface Props {
  ficha: Ficha;
  details: Details;
  isEbook?: boolean;
  sideData: {
    modalidad: string;
    curso_disponible: string;
    asesoramiento_academico: string;
    certificacion: string;
    idioma: string[];
  };
}

const ProductDetailSidebar: FC<Props> = ({
  ficha,
  details,
  isEbook,
  sideData,
}) => {
  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);
  const { state } = useContext(CountryContext);
  let scrollPosition = 0;

  const image = ficha.image;

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
      setBottomDistance(
        distanceToBottom < (isEbook ? 1500 : 1865) ? auxDistance / 2 : 0
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let translations: { [key: string]: string } = {
    modalidad: "Modalidad",
    curso_disponible: "Curso Disponible",
    asesoramiento_academico: "Asesoramiento Académico",
    certificacion: "Certificación",
    idioma: "Idioma",
  };

  const ebookData = [
    { description: "Guía profesional gratuita", icon: "elearning", size: "20" },
    {
      description: "Contenido de nivel formativo",
      icon: "diploma",
      size: "19",
    },
    {
      description: "Disponible para PC, tablet y smartphone",
      icon: "devices",
      size: "17",
    },
    { description: "Acceso a newsletters", icon: "newsletter", size: "16" },
  ];

  return (
    <div className={`course-video-widget`}>
      <div
        className={`${
          isFixed && bottomDistance == 0 && !isEbook
            ? "course-widget-wrapper fixed"
            : "course-widget-wrapper"
        } ${bottomDistance != 0 && !isEbook ? "absolute bottom-0" : ""}`}
      >
        {isFixed && !isEbook ? null : (
          <div className="course-video-thumb w-img hidden lg:flex">
            <img src={image} alt="img not found" />
          </div>
        )}

        {isEbook ? null : (
          <div className="course-video-price">
            <span>💳 Pagos sin intereses</span>
          </div>
        )}

        <div className="course-video-body">
          <ul>
            {isEbook ? (
              <>
                {ebookData.map((item, index) => {
                  return (
                    <li key={`data_${index}`}>
                      <div className="course-vide-icon">
                        <img
                          src={`/src/images/icons/${item.icon}.svg`}
                          width={item.size}
                        />
                        <span>{item.description}</span>
                      </div>
                      <div className="video-corse-info"></div>
                    </li>
                  );
                })}
              </>
            ) : (
              <>
                {Object.keys(sideData).map((key, index) => {
                  return (
                    <li key={`data_${index}`}>
                      <div className="course-vide-icon w-full">
                        <img src={`/src/images/icons/${key}.svg`} width="15" />
                        <p className="text-[12px] sm:text-base w-full flex justify-between text-dark-blue-custom">
                          <span>
                            {translations[key] ? translations[key] + ":" : ""}
                          </span>
                          {key == "idioma" ? (
                            sideData[key].length && sideData[key][0] != null ? (
                              <>{sideData[key].join(", ")}</>
                            ) : (
                              "Español"
                            )
                          ) : (
                            <span className="ml-auto">
                              {sideData[key as keyof typeof sideData]}
                            </span>
                          )}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </div>
        <div className="flex gap-2">
          <button
            onClick={scrollToContactForm}
            className="video-cart-btn w-full"
          >
            {isEbook ? "Descargar gratis" : "Contáctanos"}
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
