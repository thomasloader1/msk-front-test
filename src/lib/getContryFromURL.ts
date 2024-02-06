import countryMapping from "../data/jsons/__countryISO.json";

export const getCountryFromURL = (url: string) => {
  const urlLC = url.toLowerCase();
  const match = Object.entries(countryMapping).find(([path]) =>
    urlLC.includes(path)
  );

  return match ? match[1] : "";
};
