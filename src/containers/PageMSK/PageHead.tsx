import { removeUrlParams } from "lib/removeUrlParams";
import { FC } from "react";
import { Helmet } from "react-helmet";

interface PageHeadProps {
  title: string;
  description?: string;
}

const PageHead: FC<PageHeadProps> = ({ title, description }) => {
  const isProduction = window.location.hostname === "msklatam.com";
  const canonicalUrl = isProduction
    ? removeUrlParams(window.location.href, ["especialidad"])
    : "";
  const metaTags = isProduction ? (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={description ?? ""} />
      <meta name="theme-color" content="#008f68" />
    </>
  ) : (
    <meta name="robots" content="noindex, follow" />
  );
  return (
    <Helmet>
      <title>{`MSK | ${title}`}</title>
      {metaTags}
    </Helmet>
  );
};

export default PageHead;
