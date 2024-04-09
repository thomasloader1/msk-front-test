import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC, useEffect } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import { useHistory, useLocation } from "react-router-dom";
import PageHead from "containers/Head/PageHead";

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
  let route = "/tienda";

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

    case "trial":
      subHeading = "";
      message =
        "Ya tienes disponible tu prueba de \n" +
        "7 días gratis en el curso elegido";
      buttonLabel="Comienza ahora"
      route= "/mi-cuenta/cursos"
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

  useEffect(() => {
    // Configuración del Data Layer para GTM
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'FB_Event_Trial',
      // Puedes agregar más información si es necesario
    });

    // Limpieza del efecto si es necesario
    return () => {
      // Código de limpieza (si es necesario)
    };
  }, []); // El segundo argumento es un array de dependencias, en este caso, está vacío para ejecutarse solo una vez al montar el componente

  return (
    <div className={`nc-PageThankYou animate-fade-down ${className}`} data-nc-id="PageThankYou">
      <PageHead title="Gracias"/>
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
              onClick={() => changeRoute(route)}
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
