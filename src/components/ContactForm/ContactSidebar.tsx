import React from "react";

const ContactSidebar = () => {
  return (
    <div className="sidebar-widget-wrapper">
      <div className="support-contact mb-30">
        <div className="support-contact-inner">
          <div className="support-item">
            <div className="support-icon">
              <img src="src/icons/phone.svg" alt="" width="20" />
            </div>
            <div className="support-info-phone">
              <span>Teléfono</span>
              <p>(+88) 872-670-780</p>
              <p>(+88) 422-655-793</p>
            </div>
          </div>
          <div className="support-item">
            <div className="support-icon">
              <img src="src/icons/whatsapp.svg" alt="" width="20" />
            </div>
            <div className="support-info-whatsapp">
              <span>Whatsapp</span>
              <a href="#">(+88) 422-655-793</a>
            </div>
          </div>
          <div className="support-item">
            <div className="support-icon">
              <img src="src/icons/email.svg" alt="" width="20" />
            </div>
            <div className="support-info-email">
              <span>Email</span>
              <a href="#">email@mail.com</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSidebar;
