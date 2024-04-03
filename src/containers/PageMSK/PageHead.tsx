import JsonLd from "components/JsonLd/JsonLd";
import { StoreFiltersContext } from "context/storeFilters/StoreContext";
import { PageFilter } from "data/types";
import { getDescriptionContent } from "lib/pageHeadUtils";
import { generateSchemaJson } from "lib/pageSchemaJson";
import { removeUrlParams } from "lib/removeUrlParams";
import { FC, useContext } from "react";
import { Helmet } from "react-helmet";

interface PageHeadProps {
  title: string;
  description?: string;
  prioryTitle?: string;
  customDescription?: string;
  schemaJson?: string;
  schemaJsonData?: any| null;
}

const generatePrevNextLinks = (page: PageFilter | undefined) => {
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

const PageHead: FC<PageHeadProps> = ({
  title,
  description,
  prioryTitle,
  customDescription,
  schemaJson = "",
  schemaJsonData = null
}) => {
  const isProduction = window.location.hostname === "msklatam.com";
  const state = useContext(StoreFiltersContext);

  const descriptionContent = getDescriptionContent(
    isProduction,
    customDescription,
    description
  );

  const prevNextLinks = generatePrevNextLinks(state?.storeFilters?.page[0]);

  const canonicalUrl = isProduction
    ? removeUrlParams(window.location.href, ["especialidad"])
    : "";

  const schema = generateSchemaJson(schemaJson, schemaJsonData)
  //console.log({schema ,schemaJson})

  return (
    <Helmet>
      <title>{`${prioryTitle || title} | MSK`}</title>
      {!isProduction && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={canonicalUrl} />
      {isProduction && window.location.href.includes("tienda") && prevNextLinks}
      <meta name="description" content={descriptionContent} />
      <meta name="theme-color" content="#008f68" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default PageHead;
