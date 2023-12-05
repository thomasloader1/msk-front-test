import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import { Helmet } from "react-helmet";

export interface PageContactProps {
  className?: string;
}
const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <Helmet>
        <title>Contacto</title>
      </Helmet>
      <LayoutPage
        heading="Contacto"
        subHeading="Completa el formulario y en breve nos comunicaremos contigo"
      >
        <ContactForm hideHeader />
      </LayoutPage>
    </div>
  );
};

export default PageContact;
