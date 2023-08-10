import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC } from "react";
import { Helmet } from "react-helmet";

export interface PageEmailSentProps {
  className?: string;
}

const PageEmailSent: FC<PageEmailSentProps> = ({ className = "" }) => {
  let subHeading = "";
  let message =
    "Revisa tu bandeja de entrada, spam o correos no deseados y sigue los pasos detallados.";

  return (
    <div className={`nc-PageEmailSent ${className}`} data-nc-id="PageEmailSent">
      <Helmet>
        <title>MSK | Correo enviado</title>
      </Helmet>
      <LayoutPage subHeading="" heading=" ">
        <div className="thank-you-wrp py-16">
          <h1 className="text-center thank-you-title">Correo enviado</h1>
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-center text-natural-600 md:px-20 px-8">
              {message}
            </p>
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageEmailSent;
