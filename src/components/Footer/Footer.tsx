"use client";
import { useContext, useEffect, useState } from "react";
import bts from "../../styles/bts.module.css";
import NcModal from "@/components/NcModal/NcModal";
import FooterNewsletter from "./Newsletter";
import { CountryContext } from "@/context/country/CountryContext";
import NcLink from "../NcLink/NcLink";
import { useLocation } from "react-use";
import NcImage from "../NcImage/NcImage";

const FooterEduman = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [isOnBlog, setIsOnBlog] = useState(false);
  const { state } = useContext(CountryContext);
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

  const location = useLocation();

  useEffect(() => {
    setIsOnBlog(location.pathname == "/blog");
  }, [location.pathname]);

  return (
    <footer>
      <div className="footer-area">
        <div className="container">
          {isOnBlog ? null : (
            <div className="copyright-area grid grid-cols-1 md:grid-cols-6 items-center sm:gap-1 mb-6">
              <div className="footer-column col-span-6 md:mx-auto text-center md:text-left lg:col-span-1">
                <div className="copyright-text">
                  <p>Nuestro newsletter</p>
                </div>
              </div>
              <div className="footer-column col-span-6 mx-auto lg:col-span-2">
                <div className="divisor" />
                <p className="discounts md:mx-auto text-center md:text-left text-[12px] sm:text-[18px] leading-4 sm:leading-6">
                  Descuentos exclusivos y becas completas solo con tu
                  suscripción
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
                    <div className="field">
                      <input
                        type="email"
                        name="Email"
                        placeholder="Ingresar e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit">
                      Suscribirme
                      <NcImage
                        src={"/images/icons/plane.svg"}
                        alt=""
                        width="20"
                        height="20"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="footer-main">
            <div className="grid grid-cols-1 lg:grid-cols-3">
              <div className={`col-span-1 footer-col-1`}>
                <div className="footer-widget f-w1 mb-20">
                  <div className="footer-img grid-cols-1 align-center content-center">
                    <NcLink href="/">
                      <div className="w-[150px]">
                        <NcImage
                          src={"/images/msk-logo-light.svg"}
                          alt="footer-logo"
                          width="100"
                          height="100"
                        />
                      </div>
                    </NcLink>
                    <p className="footer-copyright">
                      Una propuesta moderna que desafía a expandir las metas
                      profesionales
                    </p>
                    <p>© 2023 • Medical&Scientific Knowledge S.L.</p>
                  </div>
                  <div className="footer-icon ml-auto">
                    <a
                      href="https://www.facebook.com/msk.online.learning"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NcImage
                        src={"/images/icons/fb.svg"}
                        alt=""
                        width="10"
                        height="10"
                        className="object-fill"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/msk.latam"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NcImage
                        src={"/images/icons/ig.svg"}
                        alt=""
                        width="20"
                        height="20"
                        className="object-fill"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/@msk.online.learning"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NcImage
                        src={"/images/icons/yt.svg"}
                        className="object-fill pt-[4px]"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/msk-online-learning/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <NcImage
                        src={"/images/icons/in.svg"}
                        className="object-fill"
                        alt=""
                        width="20"
                        height="20"
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className={`grid grid-cols-2 col-span-2`}>
                <div className={`col-span-1`}>
                  <div className="footer-widget f-w3 mt-6">
                    <ul className="text-sm md:text-base">
                      <li>
                        <NcLink href="/mision">Nuestra misión</NcLink>
                      </li>
                      <li>
                        <NcLink href="/partners">Conviértete en Partner</NcLink>
                      </li>
                      <li>
                        <a href="https://ayuda.msklatam.com/" target="_blank">
                          Centro de ayuda
                        </a>
                      </li>
                      <li>
                        <NcLink href="/convenios">Convenios</NcLink>
                      </li>

                      {state.country.includes("ec") && (
                        <li>
                          <NcLink href="/cancelar-suscripcion">
                            Arrepentimiento de compra
                          </NcLink>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                <div className={`col-span-1`}>
                  <div className="footer-widget f-w4 mt-6">
                    <ul className="text-sm md:text-base">
                      <li>
                        <NcLink href="/contacto">Contacto</NcLink>
                      </li>
                      <li>
                        <NcLink href="/terminos-y-condiciones">
                          Términos y condiciones
                        </NcLink>
                      </li>
                      <li>
                        <NcLink href="/politica-de-privacidad">
                          Política de privacidad
                        </NcLink>
                      </li>
                      <li>
                        <NcLink href="/politica-de-cookies">
                          Política de cookies
                        </NcLink>
                      </li>
                      <li>
                        <NcLink href="/condiciones-de-contratacion">
                          Condiciones de contratación
                        </NcLink>
                      </li>
                    </ul>
                  </div>
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
