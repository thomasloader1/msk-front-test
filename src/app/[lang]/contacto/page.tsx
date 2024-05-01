import LayoutPage from "@/components/MSK/LayoutPage";
import { FC } from "react";
import ContactForm from "@/components/MSK/ContactForm";
import Head from "next/head";
import PageHeadServer from "@/components/Head/PageHeadServer";

export interface PageContactProps {
  className?: string;
}
const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <PageHeadServer title="Contacto" />
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
