import LayoutPage from "@/components/MSK/LayoutPage";
import { FC } from "react";
import ContactForm from "@/components/MSK/ContactForm";
import SignupForm from "@/components/MSK/SignupForm";

export interface PageContactProps {
  className?: string;
}
const PageContact: FC<PageContactProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <LayoutPage
        heading="Crear cuenta"
        subHeading="Regístrate y disfruta al máximo de nuestra propuesta educativa"
      >
        <SignupForm hideHeader />
      </LayoutPage>
    </div>
  );
};

export default PageContact;
