import { CountryContext } from "context/country/CountryContext";
import React, { useContext } from "react";

const ContactSidebar = () => {
  const { state } = useContext(CountryContext);
  const PhoneElement = () => {
    switch (state.country) {
      case "ec":
        return <p>(+593) 2 4016114</p>;
      case "mx":
        return <p>(+52) 5590586200</p>;
      case "cl":
        return <p>(+56) 224875300</p>;
      case "ar":
        return (
          <>
            <p>0800-220-6334</p>
            <p>011-5263-0582</p>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="sidebar-widget-wrapper">
      <div className="support-contact mb-30">
        <div className="support-contact-inner">
          {PhoneElement() && (
            <div className="support-item">
              <div className="support-icon">
                <img src="/src/images/icons/phone.svg" alt="" width="20" />
              </div>
              <div className="support-info-phone">
                <span>Teléfono</span>
                {PhoneElement()}
              </div>
            </div>
          )}

          {/* <div className="support-item">
            <div className="support-icon">
              <img src="/src/images/icons/whatsapp.svg" alt="" width="20" />
            </div>
            <div className="support-info-whatsapp">
              <span>Whatsapp</span>
              {PhoneElement()}
            </div>
          </div> */}
          <div className="support-item">
            <div className="support-icon">
              <img src="/src/images/icons/email.svg" alt="" width="20" />
            </div>
            <div className="support-info-email">
              <span>E-mail</span>
              <a href="mailto:hola@msklatam.com">hola@msklatam.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
