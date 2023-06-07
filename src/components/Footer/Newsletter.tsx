import api from "Services/api";
import Checkbox from "components/Checkbox/Checkbox";
import Logo from "components/Logo/Logo";
import { Newsletter, Profession, Specialty } from "data/types";
import useUTM from "hooks/useUTM";
import { JsonData, filterSpecialities, mappingSelectedSpecialities } from "logic/NewsletterForm";
import React, { FC, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  email: string;
  setShow: (state:boolean) => void    
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
  const { utm_source, utm_medium, utm_campaign, utm_content } = useUTM();
  

  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialties();
    setSpecialties(specialtyList);
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
    setSelectedOptionProfession(value);
    setShowInputProfession(value === "Otra profesión");
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

  const formRef = useRef<HTMLFormElement>(null!);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    const jsonData = Object.fromEntries(formData);
    const Temas_de_interes = filterSpecialities(jsonData as JsonData)
    const body = mappingSelectedSpecialities(jsonData as JsonData, Temas_de_interes)
    const { response } = await api.postNewsletter(body as Newsletter);
    console.log({body})

    setShow(false)
    changeRoute("/gracias?origen=newsletter");
  };


  return (
    <form className="asdsad" ref={formRef} onSubmit={handleSubmit}>
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
          <select
            className=""
            id="Profesion"
            name="Profesion"
            value={selectedOptionProfession}
            onChange={(e) => handleOptionProfessionChange(e)}
          >
            <option defaultValue="">Seleccionar profesión</option>
            {professions
              ? professions.map((p: Profession) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))
              : ""}
          </select>
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

        <div className="contact-select">
          <select
            id="Especialidad"
            name="Especialidad"
            value={selectedOptionSpecialty}
            onChange={(e) => handleOptionSpecialtyChange(e)}
          >
            <option defaultValue="">Seleccionar especialidad</option>
            {specialties.map((s: Specialty) => (
              <option key={s.id} defaultValue={s.name}>
                {s.name}
              </option>
            ))}
          </select>
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
      </div>
      <h3 className="mt-6 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 font-raleway">
        Selecciona tus temas de interés
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-6 gap-2 mt-2">
        {newsletterSpecialties.map((specialty: Specialty) => (
          <Checkbox
            key={specialty.id}
            name={specialty.name}
            value={false}
            label={specialty.name}
            required={false}
          />
        ))}
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

      <input type="hidden" name="utm_source" value={utm_source} />
      <input type="hidden" name="utm_medium" value={utm_medium} />
      <input type="hidden" name="utm_campaign" value={utm_campaign} />
      <input type="hidden" name="utm_content" value={utm_content} />
    </form>
  );
};

export default FooterNewsletter;
