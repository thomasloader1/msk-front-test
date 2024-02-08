import { FC, useContext, useReducer, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import { Link, useHistory } from "react-router-dom";
import { utmInitialState, utmReducer } from "context/utm/UTMReducer";
import { countries } from "data/countries";
import { CountryContext } from "context/country/CountryContext";
import { CountryCode } from "libphonenumber-js/types";
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
        <div className="max-w-md mx-auto space-y-6">holi</div>
      </LayoutPage>
    </div>
  );
};

export default PageTrialSuscribe;
