import React from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import Radio from "components/Radio/Radio";
import {ContactUs} from '../../data/types';
import api from '../../Services/api';
import axios from 'axios';
// import 'react-intl-tel-input/dist/main.css';
// import IntlTelInput from 'react-intl-tel-input';

const ContactFormSection = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    console.log({formData, target: event.target});
  
    
    const jsonData: ContactUs = {
      Name: '',
      Last_Name: '',
      Email: '',
      Profession: '',
      Message: '',
      Specialty: '',
      Phone: '',
      Contact_Method: ''
    }
    
    const selectedOption = (event.target as HTMLFormElement).querySelector('input[name="Contact_Method"]:checked') as HTMLInputElement;
    if (selectedOption) {
      const label = selectedOption.id;
      // console.log({label});
      jsonData.Contact_Method = label.replace(/^Contact_Method_/, '');
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
      if (key === 'Message') {
        jsonData.Message = value as string;
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
                    <Radio name="Contact_Method" label="Teléfono" id="Contact_Method_Teléfono" />
                    <Radio name="Contact_Method" label="E-mail" id="Contact_Method_E-mail"/>
                    <Radio name="Contact_Method" label="Whatsapp" id="Contact_Method_Whatsapp"/>
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
                    <input type="text" id="Phone" name="Phone" placeholder="Teléfono" />
                  </div>
                </div>
                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" id="Profession" name="Profession">
                      <option defaultValue="Subject">
                        Seleccionar profesión
                      </option>
                      <option defaultValue="Subject">Médico</option>
                      <option defaultValue="Subject">Lic. de la Salud</option>
                      <option defaultValue="Subject">Enfermero</option>
                      <option defaultValue="Subject">Auxiliar de enfermería</option>
                      <option defaultValue="Subject">Fuerza Pública</option>
                      <option defaultValue="Subject">Técnico Universitario</option>
                      <option defaultValue="Subject">Residente</option>
                      <option defaultValue="Subject">Estudiante</option>
                      <option defaultValue="Subject">Otra Profesión</option>
                    </select>
                  </div>
                </div>
                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" id="Specialty" name="Specialty">
                      <option defaultValue="Subject">
                        Seleccionar especialidad
                      </option>
                      <option defaultValue="Subject">Anestesiología</option>
                      <option defaultValue="Subject">Diagnóstico por Imágenes</option>
                      <option defaultValue="Subject">Cardiología</option>
                      <option defaultValue="Subject">Cirugía</option>
                      <option defaultValue="Subject">Cuidados críticos e intensivos</option>
                      <option defaultValue="Subject">Dermatología</option>
                      <option defaultValue="Subject">Emergentología</option>
                      <option defaultValue="Subject">Endocrinología</option>
                      <option defaultValue="Subject">Gastroenterología</option>
                      <option defaultValue="Subject">Generalista - Clínica - Medicina interna</option>
                      <option defaultValue="Subject">Geriatría y Gerontología</option>
                      <option defaultValue="Subject">Ginecología</option>
                      <option defaultValue="Subject">Hematología</option>
                      <option defaultValue="Subject">Infectología</option>
                      <option defaultValue="Subject">Internación domiciliaria y cuidados paliativos</option>
                      <option defaultValue="Subject">Nefrología</option>
                      <option defaultValue="Subject">Neonatología</option>
                      <option defaultValue="Subject">Neurología</option>
                      <option defaultValue="Subject">Nutrición y alimentación</option>
                      <option defaultValue="Subject">Obstetricia</option>
                      <option defaultValue="Subject">Obstetricia y Ginecología</option>
                      <option defaultValue="Subject">Odontología</option>
                      <option defaultValue="Subject">Oftalmología</option>
                      <option defaultValue="Subject">Oncología</option>
                      <option defaultValue="Subject">Ortopedia y Traumatología</option>
                      <option defaultValue="Subject">Otorrinolaringología</option>
                      <option defaultValue="Subject">Pediatría</option>
                      <option defaultValue="Subject">Psiquiatría</option>
                      <option defaultValue="Subject">Radiología</option>
                      <option defaultValue="Subject">Otra Especialidad</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 mt-4">
                <div className="contact-from-input">
                  <textarea placeholder="Message" id="Message" name="Message"></textarea>
                </div>
              </div>
              <div className="flex gap-1 mt-2 mb-4">
                <Checkbox name="Terms_And_Conditions" label="Acepto las" />
                <a className="text-primary text-sm">
                  condiciones de privacidad
                </a>
              </div>
              <div className="col-xl-2 mt-2">
                <div className="cont-btn">
                  <button type="submit" className="cont-btn">
                    Enviar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="">
        <ContactSidebar />
      </div>
    </>
  );
};

export default ContactFormSection;
