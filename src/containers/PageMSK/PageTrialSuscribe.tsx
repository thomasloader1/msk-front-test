import { FC, useContext, useState } from "react";
import { CountryContext } from "context/country/CountryContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "./PageHead";
import TrialInfo from "components/Trial/TrialInfo";
import mpImg from "../../../public/images/MP.png";
import stImg from "../../../public/images/ST.svg";
import { JsonInstallmentsMapping } from "data/types";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import TrialModalContent from "components/NcModal/TrialModalContent";
import NcModalSmall from "components/NcModal/NcModalSmall";
import InputSkeleton from "components/Skeleton/InputSkeleton";
import { useHistory } from "react-router-dom";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = ({ className = "" }) => {
  const { state } = useContext(CountryContext);
  const history = useHistory();
  const { gateway } = installmentsJSON[state.country];
  const [show, setShow] = useState<boolean>(false)
  const [paymentCorrect, setPaymentCorrect] = useState<boolean | null>(null)
  const [mountedInput, setMountedInput] = useState<boolean>(false)
  return (
    <div className="nc-PageSuscribe relative animate-fade-down">
      <PageHead
        title="Inicio"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      {/* === END SEO === */}
     <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo country={state.country} setShow={setShow} setPaymentCorrect={setPaymentCorrect} setMountedInput={setMountedInput} />
          <section>
            <div
              id="rebill_elements"
              className="flex items-center justify-center h-auto"
            >
            {!mountedInput && <InputSkeleton className="w-[390px]" />}

            </div>
            <div className="text-violet-wash flex items-center justify-center gap-x-3 mt-4">
              <span>Pagos procesados con</span>
              <img
                src={gateway === "MP" ? `${mpImg}` : `${stImg}`}
                alt="gateway image"
              />
            </div>
          </section>
        </div>
      </div>
      
      <NcModalSmall
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => paymentCorrect ? (
          <TrialModalContent
            title="¡Listo!" 
            desc="Ya tienes disponible tu prueba de 7 días gratis en el curso elegido"
            textButton="Comienza ahora" 
            goToAccount={() => history.push("/mi-cuenta")}

            />
            ) : (
          <TrialModalContent 
            title="Prueba otro método de pago" 
            desc="No pudimos procesar los datos de tu tarjeta. Intenta con otra." 
            textButton="Volver" 
            setShow={setShow}
            />
        )}
      />
    </div>
  );
};

export default PageTrialSuscribe;
