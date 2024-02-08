import React, { FC, useContext, useEffect, useReducer, useRef, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import ButtonPrimary from "components/Button/ButtonPrimary";
import api from "../../Services/api";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import { Link, useHistory } from "react-router-dom";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import useProfessions from "hooks/useProfessions";
import useSpecialties from "hooks/useSpecialties";
import { countries } from "data/countries";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import PageHead from "./PageHead";
import ShowErrorMessage from "components/ShowErrorMessage";
import InputField from "components/Form/InputField";

export interface PageTrialSuscribeProps {
  className?: string;
}

const PageTrialSuscribe: FC<PageTrialSuscribeProps> = ({ className = "" }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [onRequest, setOnRequest] = useState<boolean>(false);
  const [selectedCareer, setSelectedCareer] = useState("");
  const history = useHistory();
  const [utmState, dispatchUTM] = useReducer(utmReducer, utmInitialState);
  
  const { state } = useContext(CountryContext);

  

  const fullCountry = (country: string): string => {
    return (
      countries.find((c) => c.id === country.toLowerCase())?.name || country
    );
  };




  return (
    <div
      className={`nc-PageSignUp ${className} animate-fade-down`}
      data-nc-id="PageSignUp"
    >
      <PageHead title="Crear cuenta" />
      <LayoutPage
        subHeading="Regístrate y disfruta al máximo de nuestra propuesta educativa"
        heading="Crear cuenta"
      >
        <div className="max-w-md mx-auto space-y-6">
          holi
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageTrialSuscribe;
