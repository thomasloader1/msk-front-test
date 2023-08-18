import ButtonPrimary from "components/Button/ButtonPrimary";
import React from "react";
import { Helmet } from "react-helmet";
import inProgressIcon from "../../images/construccion.svg";

const Page404: React.FC = () => (
  <div className="nc-Page404 animate-fade-down">
    <Helmet>
      <title>En construcción | MSK Medical & Scientific Knowledge</title>
    </Helmet>
    <div className="container relative py-16 lg:py-20">
      {/* HEADER */}
      <header className="text-center max-w-2xl mx-auto space-y-7">
        <img
          src={inProgressIcon}
          alt="En construcción"
          className="object-center mx-auto"
        />
        <h3 className="text-sm md:text-5xl font-semibold tracking-widest">
          En construcción
        </h3>
        <span className="block text-sm text-neutral-800 sm:text-base dark:text-neutral-200 tracking-wider font-medium">
          En estos momentos no se puede abrir esta página{" "}
        </span>
        <ButtonPrimary href="/" className="mt-4">
          Volver al inicio
        </ButtonPrimary>
      </header>
    </div>
  </div>
);

export default Page404;
