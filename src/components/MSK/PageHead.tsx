import { removeUrlParams } from "@/lib/removeUrlParams";
import { FC } from "react";
import Head from "next/head";

interface PageHeadProps {
  title: string;
  description?: string;
}

const PageHead: FC<PageHeadProps> = ({ title, description }) => {
  const isProduction =
    typeof window !== "undefined"
      ? window.location.hostname === "msklatam.com"
      : false;
  const canonicalUrl = isProduction
    ? removeUrlParams(window.location.href, ["especialidad"])
    : "";
  return (
    <Head>
      <title>{`MSK | ${title}`}</title>
      {!isProduction && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonicalUrl} />
      <meta
        name="description"
        content={isProduction ? description ?? "" : ""}
      />
      <meta name="theme-color" content="#008f68" />
    </Head>
  );
};

export default PageHead;
