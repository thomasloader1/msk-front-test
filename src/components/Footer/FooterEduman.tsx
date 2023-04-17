import React from "react";
import { Link } from "react-router-dom";
import bts from "../../styles/bts.module.css";

const FooterEduman = () => {
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
            <div className="footer-column ">
              <div className="copyright-subcribe">
                <form action="#" className="widget__subscribe">
                  <div className="field">
                    <input type="email" placeholder="Ingresar e-mail" />
                  </div>
                  <button type="submit">
                    Subscribe<i className="fas fa-paper-plane"></i>
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
                        src="src/images/msk-logo-light.svg"
                        alt="footer-logo"
                        width="150"
                      />
                    </Link>
                    <p>
                      Una propuesta moderna que desafía a expandir las metas
                      profesionales
                      <br />© 2023 • Medical&Scientific Knowledge S.L.
                    </p>
                  </div>
                  <div className="footer-icon">
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="src/icons/fb.svg" />
                    </a>
                    <a
                      href="https://www.instagram.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="src/icons/ig.svg" />
                    </a>
                    <a
                      href="https://www.youtube.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="src/icons/yt.svg" className="pt-0.5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img src="src/icons/in.svg" />
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
                      <Link to="/course">Nuestra misión</Link>
                    </li>
                    <li>
                      <Link to="/course">Conviértete en Partner</Link>
                    </li>
                    <li>
                      <Link to="/course">Preguntas frecuentes</Link>
                    </li>
                    <li>
                      <Link to="/course">Convenios</Link>
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
                      <Link to="/course">Contacto</Link>
                    </li>
                    <li>
                      <Link to="/contact">Términos y condiciones</Link>
                    </li>
                    <li>
                      <Link to="/contact">Política de privacidad</Link>
                    </li>
                    <li>
                      <Link to="/contact">Política de cookies</Link>
                    </li>
                    <li>
                      <Link to="/faq-page">Condiciones de contratación</Link>
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
