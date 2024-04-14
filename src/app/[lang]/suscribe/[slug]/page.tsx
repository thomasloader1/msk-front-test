"use client"
import {FC, useContext, useEffect, useRef, useState} from "react";
import {useGoogleReCaptcha} from "react-google-recaptcha-v3";
import mpImg from "/public/images/MP.png";
import stImg from "/public/images/ST.svg";
import installmentsMapping from '@/data/jsons/__countryInstallments.json'
import {JsonInstallmentsMapping, User} from "@/data/types";
import {useParams} from "next/navigation";
import {CountryContext} from "@/context/country/CountryContext";
import useRequestedTrialCourse from "@/hooks/useRequestedTrialCourse";
import api from "@Services/api";
import {REBILL_CONF, initRebill} from "@/logic/Rebill";
import TrialInfo from "@/components/Trial/TrialInfo";
import InputSkeleton from "@/components/Skeleton/InputSkeleton";
import TextSkeleton from "@/components/Skeleton/TextSkeleton";
import NcLink from "@/components/NcLink/NcLink";
import NcModalSmall from "@/components/NcModal/NcModalSmall";
import TrialModalContent from "@/components/NcModal/TrialModalContent";
import MissingModalContent from "@/components/NcModal/MissingModalContent";
import useSingleProduct from "@/hooks/useSingleProduct";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = () => {
  const {state: {country}} = useContext(CountryContext);
  const {slug}: { slug: string } = useParams();

  console.log(slug)
  const {product} = useSingleProduct(slug,{country})

  //const [product] = allCourses.filter((course: any) => slug === course.slug)
  const [show, setShow] = useState<boolean>(false)
  const [user, setUser] = useState<User>({} as User);
  const viewRef = useRef<any>();
  const [mountedInput, setMountedInput] = useState<boolean>(false)
  const [faliedMessage, setFaliedMessage] = useState<string>("")
  const [paymentCorrect, setPaymentCorrect] = useState<boolean | null>(null)
  const [initedRebill, setInitedRebill] = useState<boolean | null>(null)
  const {executeRecaptcha} = useGoogleReCaptcha();

  let gateway = null;
  if (installmentsJSON && country && installmentsJSON[country]) {
    gateway = installmentsJSON[country].gateway;
  }

  const mountedInputObjectState = {state: mountedInput, setState: setMountedInput}
  const {
    hasCoursedRequested,
    showAlreadyRequest,
    showMissingData,
    setShowAlreadyRequest,
    setShowMissingData
  } = useRequestedTrialCourse(product);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const profile = user;
      //console.log(profile)
      const fetchProfile = async () => {
        const res = await api.getUserData();
        setUser(res)
      }

      if (profile == null || typeof user === 'undefined') {
        fetchProfile()
      }
    }

  }, [user])

  useEffect(() => {
    if (typeof window !== 'undefined') {

      if (typeof window.Rebill !== 'undefined') {
        const initialization = {
          organization_id: REBILL_CONF.ORG_ID,
          api_key: REBILL_CONF.API_KEY,
          api_url: REBILL_CONF.URL,
        };
        console.log({REBILL_CONF, initialization});
        let RebillSDKCheckout = new window.Rebill.PhantomSDK(initialization);

        const verifiedCoursedRequested = (hasCoursedRequested != null && !hasCoursedRequested);
        const verifiedProductAndProfile = (typeof product !== 'undefined' && user != null && Object.keys(user).length > 1);

         if (initedRebill == null && verifiedCoursedRequested && verifiedProductAndProfile && !showMissingData) {
           setInitedRebill(true)
           console.group("Rebill")
           localStorage.removeItem('trialURL');
           initRebill(user, country, product, RebillSDKCheckout, setShow, setFaliedMessage, setPaymentCorrect, setMountedInput);
           console.groupEnd()
         }
      }
    }
  }, [product, hasCoursedRequested, user])


  return (
    <div ref={viewRef} className="nc-PageSuscribe relative animate-fade-down">

      <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo
            country={country}
            product={product}
            mountedInputState={mountedInputObjectState}
          />


          <section>
            <div className="text-center mb-4 text-violet-strong">
              Ingresa los datos de tu tarjeta de débito o crédito. <br/>
              No se realizará ningún cargo hasta el octavo día.
            </div>
            <div
              id="rebill_elements"
              className="flex items-center justify-center h-auto"
            >
              {mountedInput && <InputSkeleton className="w-[390px]"/>}
            </div>
            {mountedInput ? (<div className="text-violet-wash flex items-center justify-center gap-x-3 mt-4">
              <span>Pagos procesados con</span>
              <img
                src={gateway === "MP" ? `${mpImg}` : `${stImg}`}
                alt="gateway image"
              />

            </div>) : <TextSkeleton className="w-full flex items-center justify-center"/>}
            <NcLink
              href="/condiciones-de-contratacion#trial"
              target="_blank"
              className="text-primary hover:text-primary underline flex items-center justify-center mt-3"
            >
              Ver términos y condiciones de prueba gratuita
            </NcLink>
          </section>
        </div>
      </div>

      <NcModalSmall
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
          viewRef.current.classList.remove("blur-md")

        }}
        renderTrigger={() => {
          return null;
        }}
        blurView={viewRef}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => paymentCorrect ? (
          <TrialModalContent
            title="¡Listo!"
            desc="Ya tienes disponible tu prueba de 7 días gratis en el curso elegido"
            textButton="Comienza ahora"
            goToAccount={true}
          />
        ) : (
          <TrialModalContent
            title="Prueba otro método de pago"
            desc="No pudimos procesar los datos de tu tarjeta. Intenta con otra."
            faliedMessage={faliedMessage}
            textButton="Volver"
            setShow={setShow}
          />
        )}
      />

      <NcModalSmall
        isOpenProp={showMissingData}
        onCloseModal={() => {
          setShowMissingData(false);
          viewRef.current.classList.remove("blur-md")
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-[500px] md:max-w-screen-lg"
        blurView={viewRef}
        renderContent={() => (
          <MissingModalContent
            title="Antes de acceder a tu prueba gratuita"
            desc="Completa tu número de documento entre los datos personales de tu cuenta y continúa con tu solicitud de prueba."
            textButton="Ir a Datos personales"
            productSlug={slug}
            goToPersonalData={true}
          />
        )}
      />

      <NcModalSmall
        isOpenProp={showAlreadyRequest}
        onCloseModal={() => {
          setShowAlreadyRequest(false);
          viewRef.current.classList.remove("blur-md")
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        blurView={viewRef}
        renderContent={() => (
          <TrialModalContent
            title="Prueba ya solicitada"
            desc="Para continuar con este curso, debes inscribirte."
            textButton="Volver"
            goToCourse={slug}
          />
        )}
      />
    </div>
  );
};

export default PageTrialSuscribe;
