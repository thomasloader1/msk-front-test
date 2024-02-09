import { FC, useContext, useEffect, useReducer, useState } from "react";
import { CountryContext } from "context/country/CountryContext";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "./PageHead";
import TrialInfo from "components/Trial/TrialInfo";
import mpImg from "../../../public/images/MP.png";
import stImg from "../../../public/images/ST.svg";
import { JsonInstallmentsMapping } from "data/types";
import installmentsMapping from "../../data/jsons/__countryInstallments.json";
import { AuthContext } from "context/user/AuthContext";
import { getEnv } from "utils/getEnv";
import { initRebill } from "logic/Rebill";

export interface PageTrialSuscribeProps {
  className?: string;
}

const installmentsJSON: JsonInstallmentsMapping = installmentsMapping;

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = ({ className = "" }) => {
  const { state } = useContext(CountryContext);
  const { state: authState } = useContext(AuthContext);

  const { gateway } = installmentsJSON[state.country];

  initRebill(authState.profile);

  return (
    <div className="nc-PageSuscribe relative animate-fade-down">
      <PageHead
        title="Inicio"
        description="Una propuesta moderna para expandir tus metas profesionales"
      />
      {/* === END SEO === */}
      <div className="relative overflow-hidden">
        <div className="container grid grid-cols-1 lg:grid-cols-[60%_40%] gap-5 my-24">
          <TrialInfo country={state.country} />
          <section>
            <div
              id="rebill_elements"
              className="flex items-center justify-center h-auto"
            ></div>
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
    </div>
  );
};

export default PageTrialSuscribe;
