import React from "react";
import "../../styles/scss/main.scss";
import ContactSidebar from "./ContactSidebar";
import Checkbox from "components/Checkbox/Checkbox";

const ContactFormSection = () => {
  return (
    <>
      <div className="col-span-2" id="contactanos">
        <div className="contact-area-wrapper">
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
            <form action="#" className="">
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
                  <div className="contact-from-input ">
                    <input type="text" placeholder="Teléfono" />
                  </div>
                </div>
                <div className={`col-xl-6`}>
                  <div className="contact-select">
                    <select className="">
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
                  <textarea placeholder="Message" name="message"></textarea>
                </div>
              </div>
              <div className="flex gap-1 mt-2 mb-4">
                <Checkbox name="telephone" label="Acepto las" />
                <a className="text-primary text-sm">
                  condiciones de privacidad
                </a>
              </div>
              <div className="col-xl-2 mt-2">
                <div className="cont-btn">
                  <button type="button" className="cont-btn">
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
