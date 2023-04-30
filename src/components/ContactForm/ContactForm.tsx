import React, { useEffect, useState } from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";

const ContactFormSection = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] = useState<string>('');
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState<string>('');
  const [acceptConditions, setAcceptConditions] = useState(false)

  const handleOptionProfessionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedOptionProfession(value);
    setShowInputProfession(value === 'Otra Profesión');
  };

  const handleOptionSpecialtyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setSelectedOptionSpecialty(value);
    setShowInputSpecialties(value === 'Otra Especialidad');
  };

  useEffect(() => {
    axios
      .get(`${API_BACKEND_URL}/professions`)
      .then((response) => {
        setProfessions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get(`${API_BACKEND_URL}/specialities`)
      .then((response) => {
        setSpecialties(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])




  return (
    <>
      <div className="col-span-2" id="contactanos">
        <div className="contact-area-wrapper">
          <form action="#" className="" onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.nativeEvent.target)
            console.log({ fd })
          }}>

            <div className={`section-title mb-50`}>
              <h2>Contáctanos</h2>
              <div className="flex flex-wrap gap-6">
                <p className="text-gray-400">Quiero hablar por</p>
                <div className="mt-1 flex gap-4">
                  <Checkbox name="telephone" label="Teléfono" />
                  <Checkbox name="email" label="E-mail" />
                  <Checkbox name="whatsapp" label="Whatsapp" />
                </div>
              </div>
            </div>
            <div className="contact-form">
              <div className="grid grid-cols-2 grid-row-6 gap-4">
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" placeholder="Ingresar nombre" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" placeholder="Ingresar apellido" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input ">
                    <input type="text" placeholder="Ingresar e-mail" />
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="contact-from-input intl-input">
                    <PhoneInput
                      placeholder="Ingresar numero telefonico"
                      defaultCountry="MX"
                      value={''}
                      onChange={() => null} />
                  </div>
                </div>

                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" value={selectedOptionProfession} onChange={handleOptionProfessionChange}>
                      <option defaultValue="">
                        Seleccionar profesión
                      </option>
                      {professions.map((p => (<option key={p.id} value={p.name}>{p.name}</option>)))}
                    </select>
                  </div>
                  {showInputProfession && (
                    <div className="contact-from-input my-4">
                      <input type="text" placeholder="Ingresar profesion" />
                    </div>
                  )}
                </div>

                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" value={selectedOptionSpecialty} onChange={handleOptionSpecialtyChange}>
                      <option defaultValue="">
                        Seleccionar especialidad
                      </option>
                      {specialties.map((s => (<option key={s.id} defaultValue={s.name}>{s.name}</option>)))}
                    </select>
                  </div>
                  {showInputSpecialties && (
                    <div className="contact-from-input my-4">
                      <input type="text" placeholder="Ingresar especialidad" />
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-12 mt-4">
                <div className="contact-from-input">
                  <textarea placeholder="Mensaje" name="message"></textarea>
                </div>
              </div>
              <div className="flex gap-1 mt-2 mb-4">
                <Checkbox name="conditions" value={acceptConditions} useStateCallback={setAcceptConditions} label="Acepto las" />
                <a className="text-primary text-sm">
                  condiciones de privacidad
                </a>
              </div>
              <div className="col-xl-2 mt-2">
                <div className="cont-btn">
                  <button type="submit" className="cont-btn" disabled={!acceptConditions}>
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="">
        <ContactSidebar />
      </div>
    </>
  );
};

export default ContactFormSection;
