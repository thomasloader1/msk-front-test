import ButtonPrimary from "components/Button/ButtonPrimary";
import React, { useState, useEffect, FC } from "react";
import { Helmet } from "react-helmet";
import inProgressIcon from "../../images/construccion.svg";
import ImageSkeleton from "components/Skeleton/ImageSkeleton";
import TextSkeleton from "components/Skeleton/TextSkeleton";
import TitleSkeleton from "components/Skeleton/TitleSkeleton";
import notFoundImg from "../../images/404-msk.png"
import { RouteComponentProps } from 'react-router-dom';
import { CustomStaticContext  } from "data/types";

interface Page404Props extends RouteComponentProps<any, CustomStaticContext > {}

const Page404: FC<Page404Props> = ({ staticContext }) => {
  const [loading, setLoading] = useState(true);
  // Establecer el código de estado 404 si se está renderizando en el servidor
  if (staticContext) {
    staticContext.status = 404;
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <div className="container text-center">
          <div className="py-16">
            <TitleSkeleton className="mb-10" />
            <ImageSkeleton height="300px" />
          </div>
        </div>
      ) : (
        <div className="nc-Page404 animate-fade-down">
          <Helmet>
            <title>En construcción | MSK Medical & Scientific Knowledge</title>
          </Helmet>
          <div className="container relative py-16 lg:py-20">
            {/* HEADER */}
            <header className="text-center max-w-2xl mx-auto space-y-7">
              {/* <img
                src={inProgressIcon}
                alt="En construcción"
                className="object-center mx-auto"
              /> */}
              <img
                src={notFoundImg}
                alt="En construcción"
                className="object-center mx-auto"
              />
              <h6 className="text-md font-medium font-inter tracking-widest text-violet-wash">
              Ha habido un error
              </h6>
              <h1 className="block text-3xl text-neutral-800 whitespace-pre-wrap dark:text-neutral-200 tracking-wider font-bold">
              En estos momentos no se <br /> puede abrir esta página
              </h1>
              <ButtonPrimary href="/" className="mt-4 mr-3 border border-solid border-violet-custom hover:border-red-500">
                Volver al inicio
              </ButtonPrimary>

              <ButtonPrimary onClick={() => window.history.back()} className="mt-4 px-5 text-violet-custom bg-transparent border border-solid border-violet-custom hover:border-red-500">
              Atrás
              </ButtonPrimary>
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default Page404;
