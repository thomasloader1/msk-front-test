import React, { useContext } from "react";
import Head from "next/head";
import { StoreContext } from "@/context/storeFilters/StoreContext";
import { getDescriptionContent } from "@/lib/pageHeadUtils";
import { PageFilter } from "@/data/types";
import { generateSchemaJson } from "@/lib/pageSchemaJson";
import { removeUrlParams } from "@/lib/removeUrlParams";

interface PageHeadClientProps {
  title: string;
  description?: string;
  prioryTitle?: string;
  customDescription?: string;
  schemaJson?: string;
  schemaJsonData?: any | null;
  prevNextLinks?: JSX.Element;
}

const PageHeadClient: React.FC<PageHeadClientProps> = ({
  title,
  description,
  prioryTitle,
  customDescription,
  schemaJson = "",
  schemaJsonData = null,
}) => {
  const state = useContext(StoreContext);
  const isProduction =
    typeof window !== "undefined"
      ? window.location.hostname === "msklatam.com"
      : false;

  const descriptionContent = getDescriptionContent(
    isProduction,
    customDescription,
    description
  );

  const schema = generateSchemaJson(schemaJson, schemaJsonData);

  const canonicalUrl = typeof window !== "undefined" ? removeUrlParams(window.location.href, ["especialidad"]) : "";

  const prevNextLinksGenerated = generatePrevNextLinks(state?.storeFilters?.page[0]);

  return (
    <Head>
      {!isProduction && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonicalUrl} />
      {isProduction && window.location.href.includes("tienda") && prevNextLinks}
      {prevNextLinksGenerated}
      <meta name="description" content={descriptionContent} />
      <meta name="theme-color" content="#008f68" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Head>
  );
};

export const generatePrevNextLinks = (page: PageFilter | undefined) => {
  if (!page) {
    return ""; // Si no se proporciona la información de la página, retorna una cadena vacía.
  }

  const { id, total } = page;
  const baseUrl = window.location.origin + window.location.pathname; // Obtener el baseUrl

  // Enlace "prev" con la URL anterior a la actual (si no es la página 1)
  const prevLink =
    id - 1 > 0 ? (
      <link
        rel="prev"
        href={`${
          id - 1 > 1
            ? `${baseUrl}${window.location.search.replace(
                `page=${id}`,
                `page=${id - 1}`
              )}`
            : baseUrl + window.location.search.replace(`?page=${id}`, "")
        }`}
      />
    ) : null;

  // Enlace "next" con la URL de la página siguiente (si hay más páginas)
  const nextLink =
    id < total ? (
      <link
        rel="next"
        href={`${baseUrl}${window.location.search.replace(
          `page=${id}`,
          `page=${id + 1}`
        )}`}
      />
    ) : null;

  console.log({ prevLink, nextLink });

  return [prevLink, nextLink];
};

export default PageHeadClient;
