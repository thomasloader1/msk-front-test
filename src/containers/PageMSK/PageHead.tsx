import { removeUrlParams } from "lib/removeUrlParams";
import { FC } from "react";
import { Helmet } from "react-helmet";

interface PageHeadProps {
  title: string;
  description?: string;
  prioryTitle?: string;
  customDescription?: string;
}

const getDescriptionContent = (
  isProd: boolean,
  customDesc?: string,
  desc?: string
) => {
  const text = customDesc || desc || "";

  return isProd ? stripHtmlTags(text) || "" : "";
};

const stripHtmlTags = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent;
};

const PageHead: FC<PageHeadProps> = ({
  title,
  description,
  prioryTitle,
  customDescription,
}) => {
  const isProduction = window.location.hostname === "msklatam.com";
  const descriptionContent = getDescriptionContent(
    isProduction,
    customDescription,
    description
  );

  const canonicalUrl = isProduction
    ? removeUrlParams(window.location.href, ["especialidad"])
    : "";
  return (
    <Helmet>
      <title>{`${prioryTitle || title} | MSK`}</title>
      {!isProduction && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={descriptionContent} />
      <meta name="theme-color" content="#008f68" />
    </Helmet>
  );
};

export default PageHead;
