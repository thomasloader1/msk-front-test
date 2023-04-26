import React from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";
import {ContactUs} from '../../data/types';
import api from '../../Services/api';
import axios from 'axios';

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
      Message: ''
    }
    formData.forEach((value, key) => {
      if (key === 'Name') {
        jsonData.Name = value as string;
      }
      if (key === 'Last_Name') {
        jsonData.Last_Name = value as string;
      }
      if (key === 'Email') {
        jsonData.Email = value as string;
      }
      if (key === 'Profession') {
        jsonData.Profession = value as string;
      }
      if (key === 'Message') {
        jsonData.Message = value as string;
      }
    });
  
    // const response= await api.getEmailByIdZohoCRM('Leads',jsonData.email);
    // console.log('response', response);
  
    // const {response} = await api.postContactUs(jsonData);
    const response = await api.postContactUs(jsonData);
    
    console.log(response);
  
  };
  return (
    <>
      <div className="col-span-2" id="contactanos">
        <div className="contact-area-wrapper">
          <div className={`section-title mb-50`}>
            <h2>Contáctanos</h2>
            <div className="flex gap-6">
              <p className="text-gray-400">Quiero hablar por</p>
              <div className="mt-1 flex gap-4">
                <Checkbox name="telephone" label="Teléfono" />
                <Checkbox name="email" label="E-mail" />
                <Checkbox name="whatsapp" label="Whatsapp" />
              </div>
            </div>
          </div>
          <div className="contact-form">
            <form onSubmit={handleSubmit} action="/leads" className="">
              <div className="grid grid-cols-2 grid-row-6 gap-4">
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" name="Name" placeholder="Ingresar nombre" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input">
                    <input type="text" name="Last_Name" placeholder="Ingresar apellido" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input ">
                    <input type="text" name="Email" placeholder="Ingresar e-mail" />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="contact-from-input ">
                    <input type="text" name="Phone" placeholder="Teléfono" />
                  </div>
                </div>
                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="" name="Profession">
                      <option defaultValue="Subject">
                        Seleccionar profesión
                      </option>
                      <option defaultValue="Subject">Financial Aid</option>
                      <option defaultValue="Subject">Payment</option>
                      <option defaultValue="Subject">Information</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-xl-12 mt-4">
                <div className="contact-from-input">
                  <textarea placeholder="Message" name="Message"></textarea>
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
