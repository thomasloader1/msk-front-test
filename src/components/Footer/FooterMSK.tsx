import React from "react";
import { Link } from "react-router-dom";
import bts from "../../styles/bts.module.css";
import { Newsletter } from "../../data/types";
import api from "../../Services/api";

const FooterEduman = () => {
  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contactanos");
    if (contactForm) {
      window.scrollTo({
        top: document.getElementById("contactanos")!.offsetTop,
        behavior: "smooth",
      });
    }
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

    console.log(response);
  };
  return (
    <footer>
      <div className="footer-area">
        <div className={bts.container}>
          <div className="copyright-area">
            <div className="footer-column ">
              <div className="copyright-text">
                <p>Nuestro Newsletter</p>
              </div>
            </div>
            <div className="divisor" />
            <div className="footer-column">
              <p className="discounts">
                Descuentos exclusivos y becas completas solo con tu suscripción
              </p>
            </div>
            <div className="divisor" />
            <div className="footer-column">
              <div className="copyright-subcribe ">
                <form
                  onSubmit={handleSubmit}
                  method="post"
                  className="widget__subscribe"
                >
                  <div className="field ">
                    <input
                      type="email"
                      name="Email"
                      placeholder="Ingresar e-mail"
                    />
                  </div>
                  <button type="submit">
                    Suscribirme
                    <img src="/src/images/icons/plane.svg" />
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="footer-main">
            <div className={bts.row}>
              <div
                className={`${bts["col-xl-5"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}
              >
                <div className="footer-widget f-w1 mb-20">
                  <div className="footer-img">
                    <Link to="/">
                      <img
                        src="/src/images/msk-logo-light.svg"
                        alt="footer-logo"
                        width="150"
                      />
                    </Link>
                    <p className="footer-copyright">
                      Una propuesta moderna que desafía a expandir las metas
                      profesionales
                    </p>
                    <p>© 2023 • Medical&Scientific Knowledge S.L.</p>
                  </div>
                  <div className="footer-icon">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/src/images/icons/fb.svg" />
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/src/images/icons/ig.svg" />
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/src/images/icons/yt.svg" className="pt-0.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="/src/images/icons/in.svg" />
                    </a>
                  </div>
                </div>
              </div>
              <div
                className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}
              >
                <div className="footer-widget f-w3 mt-24">
                  <ul>
                    <li>
                      <Link to="/mision">Nuestra misión</Link>
                    </li>
                    <li>
                      <Link to="/partners">Conviértete en Partner</Link>
                    </li>
                    <li>
                      <Link to="/faq">Preguntas frecuentes</Link>
                    </li>
                    <li>
                      <Link to="/convenios">Convenios</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`${bts["col-xl-4"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]}`}
              >
                <div className="footer-widget f-w4 mt-24">
                  <ul>
                    <li>
                      <span
                        onClick={scrollToContactForm}
                        className="cursor-pointer"
                      >
                        Contacto
                      </span>
                    </li>
                    <li>
                      <Link to="/terminos-y-condiciones">
                        Términos y condiciones
                      </Link>
                    </li>
                    <li>
                      <Link to="/privacidad">Política de privacidad</Link>
                    </li>
                    <li>
                      <Link to="/cookies">Política de cookies</Link>
                    </li>
                    <li>
                      <Link to="/contratacion">
                        Condiciones de contratación
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterEduman;
