import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";

export interface PageThankYouProps {
  className?: string;
}

const PageThankYou: FC<PageThankYouProps> = ({ className = "" }) => {
  const history = useHistory();
  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const origin = queryParams.get("origen");

  let subHeading = "";
  let message = "";
  let buttonLabel = "Descubrir";

  switch (origin) {
    case "newsletter":
      subHeading = "Gracias por suscribirte a nuestro newsletter";
      message =
        "Ahora es momento de avanzar en tu camino profesional.\n" +
        "Conoce nuestras capacitaciones 100% a distancia, desarrolladas por\n" +
        "autores de prestigio y respaldadas por grandes instituciones.";
      break;
    case "descarga-ebook":
      subHeading = "Descargaste la guía y ya puedes acceder a su contenido";
      message =
        "Ahora es momento de avanzar un paso más en tu camino profesional.\n" +
        "Conoce nuestras capacitaciones 100% a distancia, desarrolladas por autores de prestigio y respaldadas por grandes instituciones.";
      break;
    case "new-password":
      subHeading = "Cambiaste tu contraseña con exito";
      message =
        "Ahora es momento de avanzar un paso más en tu camino profesional.\n" +
        "Conoce nuestras capacitaciones 100% a distancia, desarrolladas por autores de prestigio y respaldadas por grandes instituciones.";
      break;

    default:
      subHeading =
        "Gracias por interesarte en <b>Medical & Scientific Knowledge</b>";
      message =
        "Un agente académico te estará contactando a la brevedad. \n" +
        "Mientras, te invitamos a visitar nuestro blog con información, opiniones, \n" +
        "entrevistas y recursos de aprendizaje en múltiples formatos.";
      break;
  }

  return (
    <div className={`nc-PageThankYou ${className}`} data-nc-id="PageThankYou">
      <Helmet>
        <title>MSK | Gracias</title>
      </Helmet>
      <LayoutPage subHeading="" heading=" ">
        <div className="thank-you-wrp">
          <h1 className="text-center thank-you-title">¡Listo!</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <span
              className="subheading block text-center text-neutral-700 dark:text-neutral-300"
              dangerouslySetInnerHTML={{ __html: subHeading }}
            ></span>
            <p className="text-center description">{message}</p>
            <ButtonPrimary
              onClick={() => changeRoute("/tienda")}
              rounded="rounded-lg"
              className="font-semibold discover"
            >
              {buttonLabel}
            </ButtonPrimary>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageThankYou;
