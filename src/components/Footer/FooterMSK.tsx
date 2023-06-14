import { useState } from "react";
import { Link } from "react-router-dom";
import bts from "../../styles/bts.module.css";
import NcModal from "components/NcModal/NcModal";
import FooterNewsletter from "./Newsletter";

const FooterEduman = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const scrollToContactForm = () => {
    const contactForm = document.getElementById("contactanos");
    if (contactForm) {
      window.scrollTo({
        top: document.getElementById("contactanos")!.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const openModal = (e: any) => {
    e.preventDefault();
    setShow(true);
  };

  return (
    <footer>
      <div className="footer-area">
        <div className={bts.container}>
          <div className="copyright-area grid grid-cols-1 md:grid-cols-6 items-center sm:gap-1">
            <div className="footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-1">
              <div className="copyright-text">
                <p>Nuestro newsletter</p>
              </div>
            </div>
            <div className="footer-column col-span-6 mx-auto lg:col-span-2">
              <div className="divisor" />
              <p className="discounts md:mx-auto text-center md:text-left">
                Descuentos exclusivos y becas completas solo con tu suscripción
              </p>
              <div className="divisor" />
            </div>
            <div className="footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-3">
              <div className="copyright-subcribe ">
                <form
                  onSubmit={openModal}
                  method="post"
                  className="widget__subscribe"
                >
                  <div className="field ">
                    <input
                      type="email"
                      name="Email"
                      placeholder="Ingresar e-mail"
                      required
                      onChange={(e) => setEmail(e.target.value)}
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
                className={`${bts["col-xl-5"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]} footer-col-1`}
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
                className={`${bts["col-xl-3"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]} footer-col-2`}
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
                      <Link to="/faq">Centro de ayuda</Link>
                    </li>
                    <li>
                      <Link to="/convenios">Convenios</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div
                className={`${bts["col-xl-4"]} ${bts["col-lg-3"]} ${bts["col-md-6"]} ${bts["col-sm-6"]} footer-col-3`}
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
      <NcModal
        isOpenProp={show}
        onCloseModal={() => {
          setShow(false);
        }}
        renderTrigger={() => {
          return null;
        }}
        contentExtraClass="max-w-screen-lg"
        renderContent={() => (
          <FooterNewsletter email={email} setShow={setShow} />
        )}
        modalTitle="Nuestro Newsletter"
        modalSubtitle="Suscrí­bete para acceder a descuentos exclusivos, becas completas y contenido personalizado"
      />
    </footer>
  );
};

export default FooterEduman;
