import api from "Services/api";
import Checkbox from "components/Checkbox/Checkbox";
import Logo from "components/Logo/Logo";
import SocialsList1 from "components/SocialsList1/SocialsList1";
import { CATEGORIES } from "data/MSK/specialties";
import { CustomLink, Newsletter, Profession, Specialty } from "data/types";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  email: string;
}
const FooterNewsletter: FC<Props> = ({ email }) => {
  const [localEmail, setEmail] = useState(email);
  const [professions, setProfessions] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState("");
  const [selectedOptionProfession, setSelectedOptionProfession] = useState("");
  const [acceptConditions, setAcceptConditions] = useState(false);
  const fetchProfessions = async () => {
    const professionList = await api.getProfessions();
    setProfessions(professionList);
  };
  const fetchSpecialties = async () => {
    const specialtyList = await api.getSpecialties();
    setSpecialties(specialtyList);
  };

  const handleOptionSpecialtyChange = (e: string) => {
    console.log("handleOptionSpecialtyChange", e);
  };

  const handleOptionProfessionChange = (e: string) => {
    console.log("handleOptionProfessionChange", e);
  };

  useEffect(() => {
    fetchProfessions();
    fetchSpecialties();
  }, []);

  const history = useHistory();
  const changeRoute = (newRoute: string): void => {
    history.push(newRoute);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log({ formData, target: event.target });
    const jsonData: Newsletter = {
      Email: "",
    };
    formData.forEach((value, key, parent) => {
      if (key === "Email") {
        jsonData.Email = value as string;
      }
    });
    console.log({ jsonData });
    const { response } = await api.postNewsletter(jsonData);
    changeRoute("/gracias?origen=newsletter");
  };

  return (
    <div>
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
            onChange={(e) => handleOptionProfessionChange(e.target.value)}
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
        </div>
        <div className="contact-select">
          <select
            id="Especialidad"
            name="Especialidad"
            value={selectedOptionSpecialty}
            onChange={(e) => handleOptionSpecialtyChange(e.target.value)}
          >
            <option defaultValue="">Seleccionar especialidad</option>
            {specialties.map((s: Specialty) => (
              <option key={s.id} defaultValue={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h3 className="mt-6 text-base font-semibold text-neutral-900 lg:text-xl dark:text-neutral-200 font-raleway">
        Selecciona tus temas de interés
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-row-6 gap-2 mt-2">
        {specialties.map((specialty: Specialty) => (
          <Checkbox
            key={specialty.id}
            name="Terms_And_Conditions"
            value={false}
            useStateCallback={() => {}}
            label={specialty.name}
          />
        ))}
      </div>
      <div className="flex justify-center flex-wrap items-center gap-8">
        <div className="flex gap-1 mt-3">
          <Checkbox
            name="Terms_And_Conditions"
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
            className="cont-btn rounded flex center"
            disabled={!acceptConditions}
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
    </div>
  );
};

export default FooterNewsletter;
