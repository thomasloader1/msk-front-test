import LayoutPage from "components/LayoutPage/LayoutPage";
import { FC } from "react";
import { Helmet } from "react-helmet";
import FooterNewsletter from "components/Footer/Newsletter";

export interface PageProps {
  className?: string;
}

const PageNewsletter: FC<PageProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-PageDashboard ${className} animate-fade-down`}
      data-nc-id="PageDashboard"
    >
      <Helmet>
        <title>Newsletter</title>
      </Helmet>
      <LayoutPage
        heading="Newsletter"
        subHeading="Completa el formulario y en breve nos comunicaremos contigo"
      >
        <FooterNewsletter email="" setShow={() => true} />
      </LayoutPage>
    </div>
  );
};

export default PageNewsletter;
