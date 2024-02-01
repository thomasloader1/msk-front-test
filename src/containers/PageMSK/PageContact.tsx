import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC } from "react";
import ContactForm from "components/ContactForm/ContactForm";
import PageHead from "./PageHead";

export interface PageContactProps {
  className?: string;
}
const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <PageHead title="Contacto" />

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
