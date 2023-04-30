import React, { useEffect, useState } from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Profession, Specialty } from "data/types";
import { API_BACKEND_URL } from "data/api";
import axios from "axios";
import Radio from "components/Radio/Radio";
import {ContactUs} from '../../data/types';
import api from '../../Services/api';
// import 'react-intl-tel-input/dist/main.css';
// import IntlTelInput from 'react-intl-tel-input';

const ContactFormSection = () => {
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [showInputProfession, setShowInputProfession] = useState(false);
  const [showInputSpecialties, setShowInputSpecialties] = useState(false);
  const [selectedOptionProfession, setSelectedOptionProfession] = useState<string>('');
  const [selectedOptionSpecialty, setSelectedOptionSpecialty] = useState<string>('');
  const [acceptConditions, setAcceptConditions] = useState(false)
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log({formData, target: event.target});
  
    
    const jsonData: ContactUs = {
      Name: '',
      Last_Name: '',
      Email: '',
      Profession: '',
      Description: '',
      Specialty: '',
      Phone: '',
      Preferencia_de_contactaci_n: ''
    }
    
    const selectedOption = (event.target as HTMLFormElement).querySelector('input[name="Preferencia_de_contactaci_n"]:checked') as HTMLInputElement;
    if (selectedOption) {
      const label = selectedOption.id;
      // console.log({label});
      jsonData.Preferencia_de_contactaci_n = label.replace(/^Contact_Method_/, '');
    }

    formData.forEach((value, key, parent) => {
      if (key === 'Name') {
        jsonData.Name = value as string;
      }
      if (key === 'Last_Name') {
        jsonData.Last_Name = value as string;
      }
      if (key === 'Email') {
        jsonData.Email = value as string;
      }
      if (key === 'Phone') {
        jsonData.Phone = value as string;
      }
      if (key === 'Profession') {
        jsonData.Profession = value as string;
      }
      if (key === 'Description') {
        jsonData.Description = value as string;
      }
      if (key === 'Specialty') {
        jsonData.Specialty = value as string;
      }
      
    });
    console.log({jsonData});
  
    const {response} = await api.postContactUs(jsonData);
    
    console.log(response);
  
  };
  return (
    <>
      <div className="col-span-2" id="contactanos">
        <div className="contact-area-wrapper">
          <div className="contact-form">
            <form onSubmit={handleSubmit} action="/leads" className="">
              <div className={`section-title mb-50`}>
                <h2>Contáctanos</h2>
                <div className="flex gap-6">
                  <p className="text-gray-400">Quiero hablar por</p>
                  <div className="mt-1 flex gap-4">
                    <Radio name="Preferencia_de_contactaci_n" label="Teléfono" id="Contact_Method_Teléfono" />
                    <Radio name="Preferencia_de_contactaci_n" label="E-mail" id="Contact_Method_E-mail"/>
                    <Radio name="Preferencia_de_contactaci_n" label="Whatsapp" id="Contact_Method_Whatsapp"/>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 grid-row-6 gap-4">
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" id="Name" name="Name" placeholder="Ingresar nombre" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" id="Last_Name" name="Last_Name" placeholder="Ingresar apellido" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input ">
                    <input type="text" id="Email" name="Email" placeholder="Ingresar e-mail" />
                  </div>
                </div>

                <div className="col-xl-6">
                  <div className="contact-from-input ">
                    <input type="text" placeholder="Teléfono" />
                  </div>
                </div>

                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" id="Profession" name="Profession" value={selectedOptionProfession} onChange={handleOptionProfessionChange}>
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
                  <textarea placeholder="Message" id="Message" name="Description"></textarea>
                </div>
              </div>
              <div className="flex gap-1 mt-2 mb-4">
                <Checkbox name="Terms_And_Conditions"  value={acceptConditions} useStateCallback={setAcceptConditions} label="Acepto las" />
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
