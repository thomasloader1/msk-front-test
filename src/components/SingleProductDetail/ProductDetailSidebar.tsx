import { FC, useContext, useEffect, useState } from "react";
import { FetchSingleProduct, SingleProduct } from "data/types";
import { CountryContext } from "context/country/CountryContext";
import { useHistory, useParams } from "react-router-dom";
import { AuthContext } from "context/user/AuthContext";
import useRequestedTrialCourse from "hooks/useRequestedTrialCourse";
import PricingDetail from "./PricingDetail";
import Badge from "components/Badge/Badge";

interface Props {
 product: FetchSingleProduct;
  isEbook?: boolean;
  sideData: {
    modalidad: string;
    curso_disponible: string;
    asesoramiento_academico: string;
    certificacion: string;
    idioma: string[];
  };
}

const ProductDetailSidebar: FC<Props> = ({ product, isEbook, sideData }) => {

  const history = useHistory();
  const { ficha } = product;
  const {slug}: {slug:string} = useParams();
  const {state: authState} = useContext(AuthContext);
  const {state: countryState} = useContext(CountryContext);
  const isLocal =
  countryState.country === "int" ||
  countryState.country === "es" ;

  const [isFixed, setIsFixed] = useState(false);
  const [bottomDistance, setBottomDistance] = useState(0);
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

  const requestTrial = (slug: string) => {
    if(authState.isAuthenticated){
      history.push(`/suscribe/${slug}`)
      return
    }
    history.push(`/trial/${slug}`)
  };

  const {hasCoursedRequested,showAlreadyRequest} = useRequestedTrialCourse(product);

  return (
    <div className={`course-video-widget`}>
      <div
        className={`${
          isFixed && bottomDistance == 0 && !isEbook
            ? "course-widget-wrapper fixed"
            : "course-widget-wrapper"
        } ${bottomDistance != 0 && !isEbook ? "absolute bottom-0" : ""}`}
      >
        {isFixed && !isEbook ? <>
          {(product.sale_price !== "0") && <Badge color="sale" name="EN PROMOCIÓN" className="hidden lg:inline-block mb-2" />}
        </> : (
          <div className="course-video-thumb mb-2 w-img hidden lg:flex relative">
            {product.sale_price !== "0" && <Badge color="sale" name="EN PROMOCIÓN" className="absolute top-2 left-2" />}
            <img src={image} alt="img not found" />
          </div>
        )}
        
         {(product.sale_price !== "0") && <Badge color="sale" name="EN PROMOCIÓN" className="mb-2 lg:hidden" />}

        <PricingDetail isEbook={isEbook} product={product} />

        <div className="course-video-body">
          <ul>
            {isEbook ? (
              <>
                {ebookData.map((item, index) => {
                  return (
                    <li key={`data_${index}`}>
                      <div className="course-vide-icon">
                        <img
                          src={`/images/icons/${item.icon}.svg`}
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
                        <img src={`/images/icons/${key}.svg`} width="15" />
                        <p className="text-[11px] sm:text-sm md:text-base w-full flex justify-between items-center text-dark-blue-custom">
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
                            <div className="ml-auto text-left">
                              {sideData[key as keyof typeof sideData]}
                            </div>
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
        <div className="flex flex-col gap-2">
          <button
            onClick={scrollToContactForm}
            className="video-cart-btn w-full "
          >
            {isEbook ? "Descargar gratis" : "Contáctanos"}
          </button>
          {!isEbook && !isLocal && (
            <button
              onClick={() => requestTrial(slug)}
              className="video-cart-btn border-2 w-full disabled:border-grey-disabled disabled:text-grey-disabled disabled:cursor-not-allowed hover:disabled:bg-transparent hover:disabled:border-grey-disabled hover:disabled:text-grey-disabled"
              disabled={hasCoursedRequested}
            >
             {hasCoursedRequested ? "Prueba ya solicitada" : "Prueba 7 días gratis"}
            </button>
          )}
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
