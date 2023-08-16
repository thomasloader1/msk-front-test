import api from "Services/api";
import axios from "axios";
import Checkbox from "components/Checkbox/Checkbox";
import Logo from "components/Logo/Logo";
import { API_BACKEND_URL } from "data/api";
import { Newsletter, Specialty } from "data/types";
import {
  JsonData,
  filterSpecialities,
  mappingSelectedSpecialities,
} from "logic/NewsletterForm";
import React, {
  FC,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { useUTMContext } from "context/utm/UTMContext";
import { deleteCookie } from "utils/cookies";
import { UTMAction, utmReducer } from "context/utm/UTMReducer";

interface Props {
  email: string;
  setShow: (state: boolean) => void;
}

const FooterNewsletter: FC<Props> = ({ email, setShow }) => {
  const [localEmail, setEmail] = useState(email);
  const [professions, setProfessions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [newsletterSpecialties, setNewsletterSpecialties] = useState([]);
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [specialtiesGroup, setSpecialtiesGroup] = useState<Specialty[]>([]);
  const [selectedProfessionId, setSelectedProfessionId] = useState<string>("");
  const [currentGroup, setCurrentGroup] = useState<any>([]);
  const [studentInputs, setStudentInputs] = useState(false);
  const [studentYear, setStudentYear] = useState("");
  const [selectedCareer, setSelectedCareer] = useState("");
  const [formError, setFormError] = useState("");
  const { utm_source, utm_medium, utm_campaign, utm_content } = useUTMContext();
  const [utmState, dispatchUTM] = useReducer(utmReducer, {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
  });

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    axios
      .get(`${API_BACKEND_URL}/specialities`)
      .then((response) => {
        setSpecialties(response.data.specialities);
        setSpecialtiesGroup(response.data.specialities_group);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchNewsletterSpecialties = async () => {
    const newsletterSpecialtyList = await api.getNewsletterSpecialties();
    setNewsletterSpecialties(newsletterSpecialtyList);
  };

  const handleOptionSpecialtyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === "Otra Especialidad");
  };

  const handleOptionProfessionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    if (value && value.length) {
      const values = value.split("/");
      const profession = values[0];
      const id = values[1];
      setSelectedOptionProfession(profession);
      setSelectedProfessionId(id);
      setShowInputProfession(profession === "Otra profesión");
      setStudentInputs(profession === "Estudiante");
      const groups =
        specialtiesGroup[parseInt(id) as keyof typeof specialtiesGroup];
      setCurrentGroup(groups);
    } else {
      setSelectedOptionProfession("");
      setSelectedProfessionId("");
    }
  };

  const handleOptionCareerChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    setSelectedCareer(value);
  };

  useEffect(() => {
    fetchProfessions();
    fetchSpecialties();
    fetchNewsletterSpecialties();
  }, []);

  const history = useHistory();

  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const clearUTMAction: UTMAction = {
    type: "CLEAR_UTM",
    payload: {},
  };
  const formRef = useRef<HTMLFormElement>(null!);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    let jsonData = Object.fromEntries(formData);
    const Temas_de_interes = filterSpecialities(jsonData as JsonData);
    jsonData["Profesion"] = jsonData["Profesion"].toString().split("/")[0];
    jsonData["utm_source"] = utm_source;
    jsonData["utm_medium"] = utm_medium;
    jsonData["utm_campaign"] = utm_campaign;
    jsonData["utm_content"] = utm_content;
    const body = mappingSelectedSpecialities(
      jsonData as JsonData,
      Temas_de_interes
    );
    let response = await api.postNewsletter(body as Newsletter);
    // @ts-ignore
    if (response && response.status === 200) {
      console.log({ body });
      dispatchUTM(clearUTMAction);
      setShow(false);
      resetForm();
      jsonData = {
        ...jsonData,
        utm_source: "",
        utm_medium: "",
        utm_campaign: "",
        utm_content: "",
      };

      setTimeout(() => {
        changeRoute("/gracias?origen=newsletter");
      }, 100);
    } else {
      setFormError("Hubo un error al enviar el formulario, revise los campos");
    }
  };

  const resetForm = () => {
    setEmail("");
    setSelectedOptionSpecialty("");
    setSelectedOptionProfession("");
    setSelectedProfessionId("");
    setStudentInputs(false);
    setStudentYear("");
    setSelectedCareer("");
    setAcceptConditions(false);
    setFormError("");
    formRef.current.reset();
  };

  const optionsArray = [1, 2, 3, 4, 5];
  const selectOptions = optionsArray.map((y) => (
    <option key={`st_year_${y}`} defaultValue={y}>
      {y}
    </option>
  ));

  // console.log("UTM Context", utm_source, utm_medium, utm_campaign, utm_content);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 grid-row-6 gap-4">
        <div className="">
          <div className="contact-from-input">
            <input
              type="text"
              id="First_Name"
              name="First_Name"
              placeholder="Ingresar nombre"
            />
          </div>
        </div>
        <div className="">
          <div className="contact-from-input">
            <input
              type="text"
              id="Last_Name"
              name="Last_Name"
              placeholder="Ingresar apellido"
            />
          </div>
        </div>
        <div className="">
          <div className="contact-from-input ">
            <input
              type="text"
              id="Email"
              name="Email"
              value={localEmail}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresar e-mail"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 grid-row-6 gap-4 mt-4">
        <div className="contact-select">
          <div className="contact-select">
            <select
              className=""
              id="Profesion"
              name="Profesion"
              value={`${selectedOptionProfession}/${selectedProfessionId}`}
              onChange={handleOptionProfessionChange}
            >
              <option defaultValue="" value="">
                Seleccionar profesión
              </option>
              {professions
                ? professions.map((p: { id: string; name: string }) => (
                    <option key={p.id} value={`${p.name}/${p.id}`}>
                      {p.name}
                    </option>
                  ))
                : ""}
            </select>
          </div>
          {showInputProfession && (
            <div className="contact-from-input my-4">
              <input
                type="text"
                name="Otra_profesion"
                placeholder="Ingresar profesion"
              />
            </div>
          )}
        </div>
        {studentInputs ? (
          <div className={`col-xl-6`}>
            <div className="contact-select grid grid-cols-11 gap-2">
              <select
                className="col-span-5"
                id="Year"
                name="Year"
                defaultValue={studentYear}
              >
                <option defaultValue="">Seleccionar año</option>
                {selectOptions}
              </select>
              <select
                className="col-span-6"
                id="Career"
                name="Career"
                value={selectedCareer}
                onChange={handleOptionCareerChange}
              >
                <option defaultValue="">Seleccionar carrera</option>
                {currentGroup.map((s: any) => (
                  <option key={`st_carrer_${s.id}`} defaultValue={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <div className={`col-xl-6`}>
              <div className="contact-select">
                <select
                  className=""
                  id="Especialidad"
                  name="Especialidad"
                  value={selectedOptionSpecialty}
                  onChange={handleOptionSpecialtyChange}
                >
                  <option defaultValue="">Seleccionar especialidad</option>
                  {selectedOptionProfession && currentGroup.length
                    ? currentGroup.map((s: any) => (
                        <option key={`sp_group_${s.id}`} defaultValue={s.name}>
                          {s.name}
                        </option>
                      ))
                    : specialties.map((s: { id: string; name: string }) => (
                        <option key={`sp_${s.id}`} defaultValue={s.name}>
                          {s.name}
                        </option>
                      ))}
                </select>
              </div>
              {showInputSpecialties && (
                <div className="contact-from-input my-4">
                  <input
                    type="text"
                    name="Otra_especialidad"
                    placeholder="Ingresar especialidad"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <h3 className="mt-6 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 font-raleway">
        Selecciona tus temas de interés
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-6 gap-2 mt-2">
        {newsletterSpecialties && newsletterSpecialties.length
          ? newsletterSpecialties.map((specialty: Specialty) => (
              <Checkbox
                key={specialty.id}
                name={specialty.name}
                value={false}
                label={specialty.name}
                required={false}
              />
            ))
          : null}
      </div>
      <div className="flex justify-center flex-wrap items-center gap-8">
        <div className="flex gap-1 mt-3">
          <Checkbox
            name="Terms_And_Conditions2"
            value={acceptConditions}
            useStateCallback={setAcceptConditions}
            label="Acepto las"
          />
          <a className="text-primary text-sm underline">
            condiciones de privacidad
          </a>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            id="submit-newsletter"
            className="cont-btn rounded flex center"
            disabled={!acceptConditions}
            //onClick={logFormData} // Add onClick event handler
          >
            <div className="flex center gap-2 px-2 text-sm my-auto">
              Suscribirme
              <img
                src="/src/images/icons/plane.svg"
                className="subscribe-icon"
              />
            </div>
          </button>
        </div>
      </div>
      <p
        className="text-red-500 font-bold text-center"
        style={{ visibility: formError ? "visible" : "hidden" }}
      >
        {formError}
      </p>
      <input type="hidden" name="utm_source" value={utm_source} />
      <input type="hidden" name="utm_medium" value={utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm_campaign} />
      <input type="hidden" name="utm_content" value={utm_content} />
    </form>
  );
};

export default FooterNewsletter;
